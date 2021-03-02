import { readFileSync } from 'fs'
import { resolve } from 'path'
import { splitByUrl, tokenizeSection } from '../parser'
import { TextEditor } from '../editor'

function load(filepath: string): [string, string][] {
  return splitByUrl(readFileSync(filepath, { encoding: 'utf8' }))
    .filter((e): e is [string, string] => e[0] !== undefined)
    .map(e => [e[0], e[1].trim()])
}

describe('Parser', () => {
  it('use url to split text to sections', () => {
    const a =
      'https://www.youtube.com/watch?v=qSYGlOZNUCw\n$AAAA\n\nhttps://www.youtube.com/watch?v=kprnW5VadnY&list=WL&index=53\n$BBBB\n'
    expect(splitByUrl(a)).toEqual([
      [undefined, ''],
      ['https://www.youtube.com/watch?v=qSYGlOZNUCw', '\n$AAAA\n\n'],
      ['https://www.youtube.com/watch?v=kprnW5VadnY&list=WL&index=53', '\n$BBBB\n'],
    ])
  })

  it('tokenize inline-marker', () => {
    const a = '[=] [[大數據]] [[SaaS]]'
    expect(tokenizeSection(a)[0].stream).toEqual([
      {
        type: 'inline-marker',
        alias: undefined,
        length: 20,
        linenumber: 0,
        content: [
          {
            type: 'inline-mark',
            alias: undefined,
            content: '[=]',
            length: 3,
            linenumber: 0,
            marker: { mark: '[=]' },
          },
          {
            type: 'inline-value',
            alias: undefined,
            length: 17,
            linenumber: 0,
            marker: {
              mark: '[=]',
              value: '[[大數據]] [[SaaS]]',
            },
            content: [
              ' ',
              {
                type: 'topic',
                alias: undefined,
                content: '[[大數據]]',
                length: 7,
                linenumber: 0,
              },
              ' ',
              {
                type: 'topic',
                alias: undefined,
                content: '[[SaaS]]',
                length: 8,
                linenumber: 0,
              },
            ],
          },
        ],
      },
    ])
  })

  it.each<[string, string]>(load(resolve(__dirname, 'test-cases', 'common.txt')))(
    'tokenize to sections',
    (url: string, body: string) => {
      const sects = tokenizeSection(body).map(e => ({
        root: e.root,
        breaker: e.breaker,
        ticker: e.ticker,
        topic: e.topic,
        nestedCard: e.nestedCard,
      }))
      expect(sects).toMatchSnapshot()
    },
  )
})

describe('TextEditor', () => {
  // beforeEach(() => {
  // })

  it('edit text from previous stored text', () => {
    const prevCases = load(resolve(__dirname, 'test-cases', 'edit-previous.txt'))

    let prev: string | undefined
    for (const [url, body] of prevCases) {
      const editor = new TextEditor(prev, url, undefined)
      editor.setBody(body)
      editor.flush()
      prev = editor.toStoredText()
      expect(editor.getBody()).toMatchSnapshot()
      // expect(editor.getMarkerLines()).toMatchSnapshot()
    }
  })

  // it.each<[string, string]>(nestedCases)('會辨識nested ticker', (url: string, body: string) => {
  //   const editor = new TextEditor('[]\n', url)
  //   editor.setBody(body)
  //   editor.flush()
  //   // expect(editor.getBody()).toMatchSnapshot()
  //   for (const [card, markerlines] of editor.getNestedMarkerLines()) {
  //     expect(card).toMatchSnapshot()
  //   }
  // })

  it('insert markerline', () => {
    const insertCases = load(resolve(__dirname, 'test-cases', 'insert-markerlines.txt'))

    let cardEditor = new TextEditor('[]\n', undefined, undefined)
    for (const [url, body] of insertCases) {
      const editor = new TextEditor('[]\n', url, undefined)
      editor.setBody(body)
      editor.flush()

      // console.log(cardEditor.toStoredText())
      cardEditor = new TextEditor(cardEditor.toStoredText(), undefined, undefined)
      // cardEditor.flush()
      // console.log(editor.getBody())

      for (const [cardlabel, markerLines] of editor.getNestedMarkerLines()) {
        // eslint-disable-next-line no-await-in-loop
        for (const e of markerLines) {
          // console.log(e)
          cardEditor.insertMarkerLine(e)
        }
      }
    }

    expect(cardEditor.getBody()).toMatchSnapshot()
    // expect(cardEditor.getMarkerLines()).toMatchSnapshot()
  })

  it.each<[string, string]>(load(resolve(__dirname, 'test-cases', 'common.txt')))(
    'handle common cases',
    (url: string, body: string) => {
      const editor = new TextEditor('[]\n', url)
      editor.setBody(body)
      editor.flush()
      expect(editor.getBody()).toMatchSnapshot()
    },
  )
})
