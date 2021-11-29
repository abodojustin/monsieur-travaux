import React, { useState } from "react";
import logo from "../../public/logo.svg";
import { Form, Input, Button } from "antd";

export default function Reset() {
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    /*try {
setLoading(true)
           await Auth.signIn(email,password);
           userHasAuthenticated(true)
    setLoading(false)
       } catch(e) {
    setLoading(false)
    console.log(e);

       }*/
  }
  return (
    <div className="flex column w100 h100  itemcenter ">
      <Form
        name="normal_login"
        className="login-form w35 bgwhite  u-pad-horizontal-l u-pad-top-l rad8 z999"
        size="large"
        initialValues={{
          remember: true,
        }}
        onFinish={onSubmit}
      >
        <img src={logo} className="w22 u-mar-bottom-xl" />

        <h1 className="av-heavy fs30 u-mar-bottom-l coltext">
          {" "}
          Mot de passe perdu
        </h1>

        <h4 className="av-roman">
          Nous vous enverons un email dans votre boite afin de rénitialiser{" "}
        </h4>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Inserer votre email",
            },
          ]}
          className="u-mar-bottom-m"
        >
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>

        <Form.Item className="w100">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            className="rad8 w100"
          >
            <span className="fs18 av-heavy"> Connexion </span>
          </Button>
        </Form.Item>
      </Form>

      <div
        className="fl-r w100 u-mar-bottom-l av-roman"
        style={{ textAlign: "center" }}
      >
        je n&aposai pas de compte!
        <a className="login-form-forgot fs12" href="">
          essayer pendant 14jours
        </a>
      </div>
    </div>
  );
}
