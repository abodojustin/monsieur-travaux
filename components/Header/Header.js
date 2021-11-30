import React, { useEffect, useState } from "react";
import logo from "../../public/logo.png";
import Link from "next/link";
import Image from "next/image"
import { Button, Menu, Dropdown } from "antd";
import { CaretDownOutlined, LogoutOutlined } from "@ant-design/icons";
import { useAppContext } from "../../libs/ContextLib";
import notif from "../../public/notif.svg";
import { useRouter } from "next/router";
import cookieCutter from 'cookie-cutter'
import Cookies from "js-cookie";


export default function Header({user}) {
  //const {username} = useAppContext();

  const [logged, setLogged] = useState(false);
  

  const router = useRouter();

  useEffect(() => {
    try {
      Cookies.get("user") ? setLogged("true") : setLogged(false);
    } catch (e) {
      console.log(e);
    }
  }, []);

  async function logout() {
    try {
      Cookies.remove("user");
      router.push("/sign/login");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  const menu = (
    <Menu style={{ width: "360px" }}>
      <Menu.Item key="0" className="flex itemcenter">
        <svg viewBox="0 0 200 200" width="60" height="60">
          <circle fill="#F3F7FA" cx="100" cy="100" r="100"></circle>
          <path
            fill="#BCC2D0"
            d="M141.9 128.3c-27.1-1.4-79.3-.5-97.5-.1-7.9.2-15.6 2.6-22 7.2-4 2.9-7.9 6.9-10.2 12.3C29.1 178.9 62.1 200 100 200c13.3 0 26.4-2.6 38.6-7.7 8.3-3.7 16.1-8.5 23.3-14.1 2.5-12.9 7.1-48.5-20-49.9z"
          ></path>
          <path
            fill="#E1E4EB"
            d="M75.3 105.5l-.3 35.7c0 2.9.6 5.8 1.8 8.5l.2.5c3.6 8.2 12.1 13.1 21 12.1 4.2-.5 8.2-2.2 11.4-5 6.2-5.4 10.1-12.9 11.2-21l1.6-11.6-46.9-19.2z"
          ></path>
          <path
            fill="#BCC2D0"
            d="M118.5 144.5c.7-1.5 1.4-3.8 2.2-8.3l1.6-11.6-47-19.1 16.3 22.3c3.4 4.7 7.6 8.8 12.5 12 4.2 2.8 9.4 5.2 14.4 4.7z"
          ></path>
          <path
            fill="#E1E4EB"
            d="M148.5 82.1c-1.8 25-10.4 69.7-45 51.6 0 0-12.3-5.2-22.7-19.1-2.9-3.9-7.1-11.5-8.7-16.1L67.7 85c-6.1-16.6-3.3-35.4 8-49.1C82 28.2 95 22.2 108 22.3c22.8.2 31.2 10.4 36.1 24 3.2 8.8 5 26.5 4.4 35.8z"
          ></path>
          <path
            fill="#BCC2D0"
            d="M82 96.5c-1.5-5.3-10 2.1-10 2.1.9 2.4 2 4.7 3.2 7v3.1c5.2-1.6 8.3-7 6.8-12.2z"
          ></path>
          <path
            fill="#97A0B6"
            d="M83.3 11.4c-28.2 7.8-44.7 37.3-36.8 65.7 4.2 15.1 14.8 27.7 29.1 34.3v-10.7l4.5-9s38.5-14.6 53.2-49.3c0 0 5.4 15.1 11.8 27.6 1.2 2.5 2.5 4.9 3.7 7.1.1-.5.3-1 .4-1.5 2.1-8.9 2-18.1-.5-26.9-7.8-28.5-37.1-45.1-65.4-37.3z"
          ></path>
          <circle fill="#E1E4EB" cx="77.7" cy="95.8" r="9.9"></circle>
        </svg>

        <div className="flex column u-mar-left-s">
          <span className="av-heavy fs18">
            {Cookies.get("user") &&
              JSON.parse(Cookies.get("user")).username}
          </span>
          <span className="av-light fs14" style={{ color: "#65676b" }}>
            Voir mon profil
          </span>
        </div>
      </Menu.Item>
      <Menu.Divider />

      <Menu.Item key="1" className="flex itemcenter rad8 u-pad-vertical-s">
        <Link
          href={
            Cookies.get("user") &&
            Cookies.get("user").role == "CLIENT"
              ? "/myspace"
              : "myspacepro"
          }
        >
          <div className="  itemcenter flex">
            <div className="btnaction btnsmall br50 u-mar-right-s justcenter itemcenter flex ">
              <svg
                viewBox="0 0 28 28"
                className="a8c37x1j ms05siws hwsy1cff b7h9ocf4 em6zcovv"
                height="25"
                width="25"
              >
                <path d="M17.5 23.979 21.25 23.979C21.386 23.979 21.5 23.864 21.5 23.729L21.5 13.979C21.5 13.427 21.949 12.979 22.5 12.979L24.33 12.979 14.017 4.046 3.672 12.979 5.5 12.979C6.052 12.979 6.5 13.427 6.5 13.979L6.5 23.729C6.5 23.864 6.615 23.979 6.75 23.979L10.5 23.979 10.5 17.729C10.5 17.04 11.061 16.479 11.75 16.479L16.25 16.479C16.939 16.479 17.5 17.04 17.5 17.729L17.5 23.979ZM21.25 25.479 17 25.479C16.448 25.479 16 25.031 16 24.479L16 18.327C16 18.135 15.844 17.979 15.652 17.979L12.348 17.979C12.156 17.979 12 18.135 12 18.327L12 24.479C12 25.031 11.552 25.479 11 25.479L6.75 25.479C5.784 25.479 5 24.695 5 23.729L5 14.479 3.069 14.479C2.567 14.479 2.079 14.215 1.868 13.759 1.63 13.245 1.757 12.658 2.175 12.29L13.001 2.912C13.248 2.675 13.608 2.527 13.989 2.521 14.392 2.527 14.753 2.675 15.027 2.937L25.821 12.286C25.823 12.288 25.824 12.289 25.825 12.29 26.244 12.658 26.371 13.245 26.133 13.759 25.921 14.215 25.434 14.479 24.931 14.479L23 14.479 23 23.729C23 24.695 22.217 25.479 21.25 25.479Z"></path>
              </svg>
            </div>
            <span className="av-heavy fs14">Mon espace </span>
          </div>
        </Link>
      </Menu.Item>
      <Menu.Item
        key="1"
        className="flex itemcenter rad8 u-pad-vertical-s"
        onClick={logout}
      >
        <div className="  itemcenter flex">
          <div className="btnaction btnsmall br50 u-mar-right-s justcenter itemcenter flex ">
            <LogoutOutlined style={{ color: "#000", fontSize: "20px" }} />
          </div>
          <span className="av-heavy fs14">Déconnexion</span>
        </div>
      </Menu.Item>
    </Menu>
  );

  const menunotif = (
    <Menu style={{ width: "360px" }}>
      <div className="flex column u-mar-left-s">
        <span className="av-heavy fs20">Notifications</span>
      </div>

      <div className="flex column itemcenter">
        <img
          className="hu5pjgll u-mar-vertical-l"
          height="112"
          src={notif}
          width="112"
          alt=""
        />
      </div>
    </Menu>
  );

  return (
    <div className="header  flex justbtw u-pad-horizontal-xl u-pad-horizontal-s-res fixed w100 itemcenter">
      <div className="flex itemcenter grilleres">
        <Link href="/">
          <img src={"/logo.png"} width={90} height={60} />
        </Link>
      </div>
      <div className="flex itemcenter ">
        {logged ? (
          <>
            <Dropdown overlay={menunotif} className="cursor" trigger={["click"]}>
              <div className="btnaction br50 u-mar-right-s justcenter itemcenter flex">
                <svg
                  viewBox="0 0 28 28"
                  alt=""
                  fill={"#050505"}
                  height="20"
                  width="20"
                >
                  <path d="M7.847 23.488C9.207 23.488 11.443 23.363 14.467 22.806 13.944 24.228 12.581 25.247 10.98 25.247 9.649 25.247 8.483 24.542 7.825 23.488L7.847 23.488ZM24.923 15.73C25.17 17.002 24.278 18.127 22.27 19.076 21.17 19.595 18.724 20.583 14.684 21.369 11.568 21.974 9.285 22.113 7.848 22.113 7.421 22.113 7.068 22.101 6.79 22.085 4.574 21.958 3.324 21.248 3.077 19.976 2.702 18.049 3.295 17.305 4.278 16.073L4.537 15.748C5.2 14.907 5.459 14.081 5.035 11.902 4.086 7.022 6.284 3.687 11.064 2.753 15.846 1.83 19.134 4.096 20.083 8.977 20.506 11.156 21.056 11.824 21.986 12.355L21.986 12.356 22.348 12.561C23.72 13.335 24.548 13.802 24.923 15.73Z"></path>
                </svg>
              </div>
            </Dropdown>

            <Dropdown overlay={menu} className="cursor" trigger={["click"]}>
              <div className="flex itemcenter cursor">
                <span className="fs15 fW600 u-mar-right-xs">
                  {" "}
                   {Cookies.get("user") &&
                    JSON.parse(Cookies.get("user")).username} 
                </span>

                <span style={{ marginTop: "4.5px" }}>
                  <CaretDownOutlined />
                </span>
              </div>
            </Dropdown>
          </>
        ) : (
          <ul className="flex itemcenter justendres w100res grille13">
            <li className="fs14 fs12res av-medium u-mar-right-m cursor">
              <Link href="/sign/login">
                <a className="coltext">SE CONNECTER</a>
              </Link>
            </li>
            <li className="fs14 fs12res av-medium u-mar-right-m cursor nomarres">
              <Link href="/sign/register">
                <a className="coltext">{`S'INSCRIRE`}</a>
              </Link>{" "}
            </li>
            <li className="nonedisplayres">
              <Link href="/sign/registerPro">
                <Button
                  type="primary"
                  size="large"
                  className="rad4 w100 itemcenter flex nopad"
                  style={{ height: 45, border: "nonce" }}
                >
                  <span className="fs14 av-roman white u-pad-horizontal-s">
                    DEVENIR FOURNISSEUR
                  </span>
                </Button>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
/* 
export async function getStaticProps() {
  const user = localStorage.getItem("user");

  return {
    props: {
      user,
    },
  };
}
  */
export async function getServerSideProps({ rekest, response }) {
  
return {
  props: { user: Cookies.user || ""},
};
}
