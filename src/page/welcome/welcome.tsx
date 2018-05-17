import * as React from 'react'

interface propsType {
  params?:any
  [name:string]:any
}

export default class Welcome extends React.Component<propsType,{}>{
  public state: any

  constructor(props: any) {
    super(props)
    this.state = null
  }

  public render() {
    return (
      <div className="welcomeWrapper">
        Hello ！小读
      </div>
    )
  }
}