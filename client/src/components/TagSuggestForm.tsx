// import React, { Component } from 'react'
import React from 'react'
// import styled, { css } from 'react-emotion'
// import { size } from 'polished'

// import Button from './button'
// import space from '../assets/images/space.jpg'
// import { ReactComponent as Logo } from '../assets/logo.svg'
// import { ReactComponent as Curve } from '../assets/curve.svg'
// import { ReactComponent as Rocket } from '../assets/rocket.svg'
// import { colors, unit } from '../styles'
// import * as LoginTypes from '../pages/__generated__/login'

import { useForm } from 'react-hook-form'

import * as UpsertFeed from '../store/__generated__/UpsertFeed'

type FormData = {
  id: string
  header: string
  url: string
}

interface Props {
  // login: (a: { variables: LoginTypes.loginVariables }) => void
  upsert: (a: { variables: UpsertFeed.UpsertFeedVariables }) => void
}

const FeedForm: React.FC<Props> = ({ upsert }) => {
  const { register, handleSubmit, setValue, errors } = useForm<FormData>()
  // const onSubmit = data => {
  //   alert(JSON.stringify(data));
  // };

  const onSubmit = handleSubmit(({ id, header, url }) => {
    console.log('submit...')
    console.log({ id, header, url })
    upsert({
      variables: { id, data: { header, url } }
    })
  })

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="search">header</label>
          <input name="search" placeholder="search..." ref={register}
          // value="this is a header"
          />
        </div>

        {/* <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            placeholder="bluebill1049@hotmail.com"
            type="email"
            ref={register}
          />
        </div> */}

        <button type="submit">Submit</button>
        <button
          type="button"
          onClick={() => {
            setValue("header", "this is a header")
            setValue("url", "http://this.is.a.url")
            // errors.bill
          }}
        >Set Value</button>
      </form>
    </div>
  )
}

export default FeedForm

// interface FormProps {
//   login: (a: { variables: LoginTypes.loginVariables }) => void
// }

// interface FormState {
//   email: string
// }

// export default class FeedForm extends Component<FormProps, FormState> {
//   state = { email: '' }
//   const { register, handleSubmit, watch, errors } = useForm()

//   onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const email = (event.target as HTMLInputElement).value
//     this.setState(s => ({ email }))
//   }

//   onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault()
//     this.props.login({ variables: { email: this.state.email } })
//   }

//   render() {
//     return (
//       <Container>
//         <Header>
//           <StyledCurve />
//           <StyledLogo />
//         </Header>
//         <StyledRocket />
//         <Heading>Create feed</Heading>
//         <StyledForm onSubmit={(e) => this.onSubmit(e)}>
//           <input
//             required
//             type="text"
//             name="header"
//             placeholder="text"
//             data-testid="feedinput-header"
//             onChange={(e) => this.onChange(e)}
//           />
//           <input
//             required
//             type="text"
//             name="url"
//             placeholder="url"
//             data-testid="feedinput-url"
//             onChange={(e) => this.onChange(e)}
//           />
//           {/* <StyledInput
//             required
//             type="email"
//             name="email"
//             placeholder="Email"
//             data-testid="login-input"
//             onChange={(e) => this.onChange(e)}
//           /> */}
//           <Button type="submit">Log in</Button>
//         </StyledForm>
//       </Container>
//     )
//   }
// }

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

// const Container = styled('div')({
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   flexGrow: 1,
//   paddingBottom: unit * 6,
//   color: 'white',
//   backgroundColor: colors.primary,
//   backgroundImage: `url(${space})`,
//   backgroundSize: 'cover',
//   backgroundPosition: 'center',
// })

// const svgClassName = css({
//   display: 'block',
//   fill: 'currentColor',
// })

// const Header = styled('header')(svgClassName, {
//   width: '100%',
//   marginBottom: unit * 5,
//   padding: unit * 2.5,
//   position: 'relative',
// })

// const StyledLogo = styled(Logo)(size(56), {
//   display: 'block',
//   margin: '0 auto',
//   position: 'relative',
// })

// const StyledCurve = styled(Curve)(size('100%'), {
//   fill: colors.primary,
//   position: 'absolute',
//   top: 0,
//   left: 0,
// })

// const Heading = styled('h1')({
//   margin: `${unit * 3}px 0 ${unit * 6}px`,
// })

// const StyledRocket = styled(Rocket)(svgClassName, {
//   width: 250,
// })

// const StyledForm = styled('form')({
//   width: '100%',
//   maxWidth: 406,
//   padding: unit * 3.5,
//   borderRadius: 3,
//   boxShadow: '6px 6px 1px rgba(0, 0, 0, 0.25)',
//   color: colors.text,
//   backgroundColor: 'white',
// })

// const StyledInput = styled('input')({
//   width: '100%',
//   marginBottom: unit * 2,
//   padding: `${unit * 1.25}px ${unit * 2.5}px`,
//   border: `1px solid ${colors.grey}`,
//   fontSize: 16,
//   outline: 'none',
//   ':focus': {
//     borderColor: colors.primary,
//   },
// })
