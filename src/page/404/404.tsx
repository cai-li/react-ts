import * as React from 'react'

interface propsType {
  params?:any
  [name:string]:any
}

export default class Page404 extends React.Component<propsType,{}>{
  public state: any

  constructor(props: any) {
    super(props)
    this.state = null
  }

  public render() {
    return (
      <div className="errorWrapper">
        404 ! 错误
      </div>
    )
  }
}