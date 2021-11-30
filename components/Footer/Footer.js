import React, { useState } from "react";
import logo from "../../public/logo.png";
import Link from "next/link";

import axios from "axios";
import { URL } from "../../urlapi";

import {
  TwitterOutlined,
  LinkedinFilled,
  InstagramOutlined,
  FacebookFilled,
} from "@ant-design/icons";
import { Row, Col, Input, Button, message, Modal, Divider, Form } from "antd";
const { TextArea } = Input;

export default function Footer() {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit (values) {
      console.log(values)
  }

  return (
    <div className="main-footer ">
      <div className="main-container u-pad-horizontal-xl u-pad-l-res">
        <Row>
          <Col xs={24} sm={11} md={6} lg={6}>
            <img src="/logo.png" height="70" />

            <p
              style={{
                fontSize: 12,
                marginTop: 0,
                color: "#959595",
                borderBottom: "2px solid #959595",
                paddingBottom: "10px",
              }}
            >
              {" "}
              Plateforme de mise en relation entre les professionnels du
              bâtiment et les personnes ou entreprises ayant des travaux chez
              eux.
            </p>

            <div className="social flex" style={{ textAlign: "left" }}>
              <a
                href="https://www.facebook.com/monsieurtravaux.ci"
               // target="_blank"
                className="facebook flex itemcenter justcenter"
              >
                <FacebookFilled />
              </a>
              <a
                href="https://twitter.com/monsieurtravau1"
                //target="_blank"
                className="facebook flex itemcenter justcenter"
              >
                <TwitterOutlined />
              </a>
              <a
                href="https://www.linkedin.com/in/monsieur-travaux-608231211/"
                //target="_blank"
                className="facebook flex itemcenter justcenter"
              >
                <LinkedinFilled />
              </a>
              <a
                href="https://instagram.com/"
                //target="_blank"
                className="facebook flex itemcenter justcenter"
              >
                <InstagramOutlined />
              </a>
            </div>
          </Col>

          <Col xs={11} sm={12} md={6} lg={6} offset={1}>
            <div className="menufoot u-mar-top-s">
              <Link href="/quisommesnous">
                <a>
                <i className="triangle gris"></i>Qui sommes nous?
                </a>
              </Link>
              <Link href="/mentions">
                <a>
                <i className="triangle gris"></i>Informations légales
                </a>
              </Link>
              <Link href="/cgu">
                <a>
                <i className="triangle gris"></i>{`Conditions d'utilisation`}
                </a>
              </Link>
              <Link href="/faq">
                <a>
                <i className="triangle gris"></i>FAQ
                </a>
              </Link>
              <a
                href="https://s3.eu-central-1.amazonaws.com/www.monsieurtravaux.ci/Publicite_sur_monsieurtravaux_ci.pdf"
                //target="_blank"
              >
                <i className="triangle gris"></i>Publicité
              </a>
            </div>
          </Col>

          <Col xs={11} sm={24} md={4} lg={4} offset={1}>
            <div className="menufoot u-mar-top-s">
              <a
                href="https://s3.eu-central-1.amazonaws.com/www.monsieurtravaux.ci/Comment.ca.marche..V.pdf"
                //target="_blank"
              >
                <i className="triangle gris"></i>Comment ça marche?
              </a>
              <Link href="/secteurs">
                <a>
                <i className="triangle gris"></i>Secteurs
                </a>
              </Link>
              <a
                href="https://s3.eu-central-1.amazonaws.com/www.monsieurtravaux.ci/FICHE_ABONNEMENT_Monsieurtravaux.pdf"
                //target="_blank"
              >
                <i className="triangle gris"></i>{`Fiche d'abonnement`}
              </a>
              <Link href="/charte">
                <a>
                <i className="triangle gris"></i>Charte qualité
                </a>
              </Link>
              <a
                href="https://s3.eu-central-1.amazonaws.com/www.monsieurtravaux.ci/Formulaire_de_resiliation_Monsieurtravaux.pdf"
                //target="_blank"
              >
                <i className="triangle gris"></i>Fiche de résiliation
              </a>
            </div>
          </Col>

          <Col xs={24} sm={24} md={4} lg={4} offset={1}>
            <Button
              type="primary"
              onClick={() => setIsModalVisible(true)}
              className="u-mar-top-s fs14"
            >
              {" "}
              CONTACTEZ NOUS{" "}
            </Button>
          </Col>

          <Modal
            title="Contactez nous"
            footer={null}
            visible={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
          >
            <div className="flex column itemcenter jsutcenter">
              <Form layout="vertical" onFinish={onSubmit}>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      name="name"
                      label="Votre nom et prénom"
                      rules={[
                        {
                          required: true,
                          message: "Veuillez entrer votre nom",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name="email" label="Votre email">
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      name="message"
                      label="Description"
                      rules={[
                        {
                          required: true,
                          message: "Veuillez entrer une message",
                        },
                      ]}
                    >
                      <TextArea rows={3} style={{ height: "auto" }} />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item className="w100">
                  <Divider />
                  <div style={{ textAlign: "right" }}>
                    <Button
                      onClick={() => setIsModalVisible(false)}
                      size={"large"}
                      className="rad8 u-pad-horizontal-l"
                      style={{ marginRight: 12 }}
                    >
                      Annuler
                    </Button>
                    <Button
                      size={"large"}
                      loading={loading}
                      type="primary"
                      htmlType="submit"
                      className="rad8 u-pad-horizontal-l"
                    >
                      Envoyer
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </Modal>
        </Row>

        <div className="copyright-text">
          <span style={{ color: "white" }}>
            <Link href="/">
              <a style={{ color: "white" }}>MonsieurTravaux.ci</a>
            </Link>{" "}
            © Copyright {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </div>
  );
}
