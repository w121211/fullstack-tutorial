import React, { useState } from 'react';
import { RouteComponentProps, useLocation } from '@reach/router';
import { useQuery } from '@apollo/react-hooks';

import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
// import { Post } from '../components/PostForm'

interface Props extends RouteComponentProps { }

export const PostCreate: React.FC<Props> = () => {
  // const location = useLocation()
  // const sp = new URLSearchParams(window.location.search)
  // const cat = sp.get("cat")
  // const [cat, setCat] = useState<string>(sp.get("cat") || QT.PostCat.LINK)
  // if (!(cat in QT.PostCat)) setCat(QT.PostCat.LINK)
  // const cat = (!(sp.get("cat") || "" in QT.PostCat)) 
  // Object.values(QT.PostCat).includes(null)

  const [cat, setCat] = useState<QT.PostCat>(QT.PostCat.LINK)
  const { data: meData } = useQuery<QT.me>(queries.ME)
  const [showLogin, setShowLogin] = useState<boolean>(false)

  switch (cat) {
    case QT.PostCat.LINK:
      // return <PostForm />
      return null
    case QT.PostCat.POST:
      return <></>
    case QT.PostCat.POLL:
      return <></>
    case QT.PostCat.COMMIT:
      return <></>
  }

}
