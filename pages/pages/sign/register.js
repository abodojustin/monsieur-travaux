import React, { useState, useEffect } from "react";
import logo from "../../public/logo.svg";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Layout, Form, Row, Col, message, Input, Button, Select } from "antd";
import { Carousel } from "react-responsive-carousel";
import Link from "next/link";
import { URL } from "../../urlapi";
import axios from "axios";
import { useAppContext } from "../../libs/ContextLib";
import "antd/dist/antd.css";
const { Content } = Layout;
const { Search } = Input;

export default function Register({ banniere }) {
  const [loading, setLoading] = useState(false);
  const [loadingBan, setLoadingBan] = useState(false);
  const [send, setSend] = useState(false);
  const [bannieres, setBannieres] = useState(null);
  const { Option } = Select;
  const [form] = Form.useForm();

  useEffect(() => {
    const getBan = async () => {
      setBannieres(banniere);
      setLoadingBan(false);
    };

    getBan();
  }, []);

  async function onSubmit(values) {
    try {
      setLoading(true);
      /* values.phone = '2376949g99393'
            values.firstname="sinclair" */
      const result = await axios.post(URL + "/api/user/createclient", values);

      setSend(true);

      message.success("Inscription réussie!!");
      setLoading(false);
    } catch (e) {
      console.log(e.response);
      setLoading(false);
      message.warning("Erreur connexion!");
    }
  }

  return (
    <Layout className=" bgwhite">
      <Header />

      <Content className="u-mar-top-xl">
        <Layout className="bgwhite">
          <Row>
            <Col
              xs={24}
              sm={24}
              md={8}
              lg={8}
              className="nonedisplayres"
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
              }}
            >
              {send ? (
                <h1 className="av-heavy fs24 u-mar-bottom-s coltext grille25 center">
                  {" "}
                  Veuillez Veuillez Verifier <br /> votre Adresse email pour
                  valider votre compte !
                </h1>
              ) : (
                <div className="flex column w100 h100  itemcenter justcenter ">
                  <Form
                    name="normal_login"
                    className="login-form w50 w100res bgwhite  u-pad-horizontal-l u-pad-top-s rad16 "
                    size="large"
                    form={form}
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onSubmit}
                  >
                    <div className="flex justbtw itemcenter">
                      <h1 className="av-heavy fs24 u-mar-bottom-s coltext grille25 center">
                        {" "}
                        Crééer un compte client
                      </h1>

                      {/* <img src={logo} className="w15 u-mar-bottom-xs grille"/> */}
                    </div>
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item
                          name="firstname"
                          rules={[
                            {
                              required: true,
                              message: "Inserer votre nom",
                            },
                          ]}
                          className="u-mar-bottom-m"
                        >
                          <Input placeholder="Nom" />
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item name="lastname" className="u-mar-bottom-m">
                          <Input placeholder="Prénom" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: "Inserer votre numéro de telephone",
                        },
                      ]}
                      className="u-mar-bottom-m"
                    >
                      <Input placeholder="Télephone" maxLength={25} />
                    </Form.Item>

                    <Form.Item
                      name="email"
                      rules={[
                        {
                          type: "email",
                          required: true,
                          message: "Insérer un email correcte",
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

                    <Form.Item className="w100 u-mar-top-l u-mar-bottom-xxs">
                      <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        loading={loading}
                        className="rad8 w100"
                      >
                        <span className="fs18 av-heavy">
                          {" "}
                          S&aposinscrire maintenant{" "}
                        </span>
                      </Button>
                    </Form.Item>
                  </Form>

                  <div
                    className="fl-r w100  av-roman fs10"
                    style={{ textAlign: "center" }}
                  >
                    En vous inscrivant vous acceptez les
                    <a className="login-form-forgot fs12" href="">
                      conditions d&aposutilisation
                    </a>
                  </div>

                  <div
                    className="fl-r w100 u-mar-top-s av-roman coltext"
                    style={{ textAlign: "center" }}
                  >
                    Vous êtes un professionnel ?
                    <Link
                      href={"/sign/registerPro"}
                      className="login-form-forgot fs12"
                    >
                      Inscrivez vous ici
                    </Link>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Layout>
      </Content>

      <Footer />
    </Layout>
  );
}

export async function getStaticProps() {
  const result = await axios.get(URL + "/api/banniere/Page d'inscription");
  const banniere = result.data;
  return {
    props: {
      banniere,
    },
  };
}
