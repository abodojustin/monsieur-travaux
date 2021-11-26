import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Layout, Row, Col, Input, Form, Button, message } from "antd";
import { URL } from "../../urlapi";
import Link from "next/link";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
const { Content } = Layout;
const { Search } = Input;
import "antd/dist/antd.css";
import { useRouter } from "next/router";
import cookiesCutter from "cookie-cutter"

export default function Login({ banniere }) {

  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [bannieres, setBannieres] = useState(null);

  useEffect(() => {
    const getBan = () => {
      setBannieres(banniere);
    };
    getBan();
  }, []);

  async function onSubmit(values) {
    try {
      setLoading(true);
      /* values.phone = '2376949g99393'
      values.firstname="sinclair" */
      const result = await axios.post(URL + "/api/user/loginapp", values);
      const serializedState = JSON.stringify(result.data);
      cookiesCutter.set("user", serializedState);
      /* console.log(localStorage.getItem("user")); */

      if (result.data.role == "CLIENT") {
        router.push("/myspace/spaceclient");
      } else {
        router.push("/myspace/spacepro");
      }

      message.success("Connexion réussie!!");
      setLoading(false);
    } catch (e) {
      console.log(e.response);
      setLoading(false);
      message.warning("Erreur connexion!");
    }
  }

  return (
    <Layout className="bgwhite">
      <Header />
      <Content className="u-mar-top-xl">
        <Layout className="bgwhite">
          <Row>
            <Col
              xs={24}
              sm={24}
              md={8}
              lg={8}
              className="bglog nonedisplayres"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px",
              }}
            >
              <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
                {bannieres != null &&
                  bannieres.map((u) => (
                    <div key={u.image}>
                      <img src={u.image} style={{ borderRadius: "8px" }} />
                    </div>
                  ))}
              </Carousel>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={16}
              lg={16}
              className="login-content right"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Form
                name="normal_login"
                className=" bgwhite  u-pad-horizontal-l u-pad-top-l rad16"
                size="large"
                initialValues={{
                  remember: true,
                }}
                onFinish={onSubmit}
              >
                <h1 className="av-heavy fs30 u-mar-bottom-l coltext center">
                  {" "}
                  Bonjour & bienvenu !{" "}
                </h1>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: "email",
                      required: true,
                      message: "Inserer votre email",
                    },
                  ]}
                  className="u-mar-bottom-m"
                >
                  <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Inserer votre mot de passe!",
                    },
                  ]}
                  className="u-mar-bottom-xs"
                >
                  <Input type="password" placeholder="Mot de passe" />
                </Form.Item>

                <div
                  className="fl-r w100 u-mar-bottom-l av-roman  "
                  style={{ textAlign: "right" }}
                >
                  <Link href={"/sign/reset"}>
                    <a className="login-form-forgot fs12 coltext">
                      Mot de passe oublié ?
                    </a>
                  </Link>
                </div>

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

                <div
                  className="fl-r w100 u-mar-bottom-l av-roman"
                  style={{ textAlign: "center" }}
                >
                  je n&aposai pas de compte !
                  <Link href={"/sign/register"}>
                    <a className="login-form-forgot fs12 u-mar-left-xs coltext">
                      crééer gratuitement un compte
                    </a>
                  </Link>
                </div>
              </Form>
            </Col>
          </Row>
        </Layout>
      </Content>
      <Footer />
    </Layout>
  );
}

export async function getStaticProps() {
  const result = await axios.get(URL + "/api/banniere/Page de connexion");
  const banniere = result.data;
  return {
    props: {
      banniere,
    },
  };
}
