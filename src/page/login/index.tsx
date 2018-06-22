import * as React from 'react'
import './login.less'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'

const FormItem = Form.Item

class Login extends React.Component<FormComponentProps, any> {
  public state: any

  constructor(props: FormComponentProps) {
    super(props)
    this.state = null
  }

  private submit(e: any) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('cuowu', values)
      }
    })
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="pageLogin">
        <header>

        </header>
        <main>
          <div className="pageLogin-form">
            <h1>登录</h1>
            <Form onSubmit={(e) => this.submit(e)}>
              <FormItem>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: '用户名不能为空' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
                  )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入正确密码' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                  )}
              </FormItem>
            </Form>
          </div>
        </main>
      </div>
    )
  }
}

export default Form.create()(Login);