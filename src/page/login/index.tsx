import * as React from 'react'
import './login.less'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import CacheService from 'services/cacheService'
import JwtService from 'services/jwtService'
import hashHistory from 'router/history'

const FormItem = Form.Item
const userId = 'cai123ld3c7f8k2h3j23k'
const jwt = 'kerii34234234mdfk8s99dssf'

class Login extends React.Component<FormComponentProps, any> {
  public state: any

  constructor(props: FormComponentProps) {
    super(props)
    this.state = null
  }

  private submit(e: any) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if(!err){
        CacheService.open(userId)
        JwtService.saveJwt(jwt)
        hashHistory.push('/hello')
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
            <h1 className="pageLogin-form--title">登录</h1>
            <Form onSubmit={(e) => this.submit(e)}>
              <FormItem>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: '用户名不能为空' }],
                })(
                  <Input className="pageLogin-form--input" suffix={<Icon type="user" className="pageLogin-form--icon" />} placeholder="请输入用户名" />
                  )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入正确密码' }],
                })(
                  <Input className="pageLogin-form--input" suffix={<Icon type="lock" className="pageLogin-form--icon" />} type="password" placeholder="请输入密码" />
                  )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox>记住密码</Checkbox>
                  )}
                <a className="login-form-forgot" href="">忘记密码</a>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  登录
                </Button>
                <a href="">立即注册</a>
              </FormItem>
            </Form>
          </div>
        </main>
      </div>
    )
  }
}

export default Form.create()(Login);