import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { HomeTwoTone } from "@ant-design/icons";

const Not_found = () => {
  return (
    <div>
      <div className="flex_home">
        <div style={{ flexGrow: "1" }} className="min_wide">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADoklEQVR4nO2bPWgVQRDHf4mg+cAERBArBTWlpZWggpXxA+MHKnkBC1ERJFHjJ4QHitooNhJeTAIq2lgIilUINhItbRSMiRbaaJFEFCWKPlnYC5N9++7di++y984dGDh2bndu/rczO7O3B4XUCOwATgBnUsJdwHaggRCqAbqBKSCfUp4ETmpbZ1EtcD8BDzhffM8Eodu4YQzIAVdTwjltk7RRufiMz8tpfwtYRPpI2TRguEMDOjgEjW9TanxAyrZxYe9W1XhKNPSSfsqZbpAVDeraDI4ZsZxkdFtUeRKpwN5sCAAdlgiaKUNe9QBkLAa2lyGvegBqtUHBctJucYEwedUDkEbyAOBnAEVdYCgBlVvcPBQGQP4/46wHgNkz4FkCKre4Wdnol0F8HoBPhHwmiE+Fs9bcOOXkU2H8MohfBolpGWwEbgKDQHPIfS3AZeCxZnW9Zg76WoGHwM6kuECvGKuzyD3ngV+WwkS1nS1D1wrgh+6rvms4B6DFMMw21rEIFdrhiPpuG/2cA/DAVmoKUi7xRchHgH3AfuC58cWmqYSutcDvJAGwDvhTAoC9QvYGqBMydT0q5HtK6HtimTlOAXhabLNB0Dkhu2YZ47qQh8WCDUVcxxkAW8J2W8IUlykPaCRJANQCL0X/6ZgB2FVElzMAOkTf70B/jAAsAF6Le264BmCh8an5Somx/hWAI0L+FVjmGoAu0W8CWBIjAPXAByHv0e3OAFgMfBL91BkDYgTggpB91vqdAnBJ9Pkojp/FAcBS4wiPyiZxCcBy4JvoczCikXMFQOYH73TscQpAp7j/lY7OcQIg375Km3ENQFbc/15/awt43Eh32yoAgDRy2NAnZYMRaoiKANBjKA5jtTrYUmE1raOmwmaNEcbH5wOATUXqeRurt2QrhkaNYqheH9EL5LuFbDiiLvVMG+cDAEUrgc0WviPGyhkBq9nwZ1UCH9D8wpg1TcbZvvVF9EkA1DM53Q+IMtbRCG/yENHJSRCMmh0W2xI7Dfy0GD4tEqqoNCU2URIBQLM+j9tfIiKv1snUI80XgVVz0NemN1UTsylaDeQBwM8AvAvgYwA+CPpVAL8MZtH/0cn8Pe3UJ+ztUg3bRMNYyn+aqtO7SoG9rej9vEnROJBSEOr0pomsOusDoXSDvN7ZySXgZHeluM948wXFWo3+nTT/n/Bd2//DNfo/OukOaeMJ/eYLjEeQigkqMKoI6fpkd6VY2aL+Ep3x+YD+AoK194kljOciAAAAAElFTkSuQmCC"></img>
          <br /> <br /> <br />
          <Link to="/">
            <Button type="primary" size="large">
              Return <HomeTwoTone />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Not_found;
