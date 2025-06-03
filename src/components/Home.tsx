import React from 'react';
import { StyledTitle } from './StyledTitle';
import homeImg from '../assets/aboutpageimg.png';

export const Home = () => {
    return (
        <table>
            <tbody>
                <tr>
                    <td style={{ verticalAlign: 'top', padding: '1rem' }}>
                        <div
                            className="d-flex align-items-start"
                            style={{ width: '100%' }}
                        >

                            {/* <h1
                                style={{
                                    fontSize: "3rem",
                                    fontWeight: "600",
                                    color: "#805fa3",
                                    letterSpacing: "1px",
                                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                                    textShadow: "1px 1px 2px rgba(60, 60, 120, 0.2)",
                                    margin: 0,
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                <span
                                    style={{
                                        fontWeight: "800",
                                        fontSize: "3.2rem",
                                        fontStyle: "italic",
                                        background: "linear-gradient(to right, #a076f9, #7c60d1)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        textShadow: "1px 1px 4px rgba(124, 96, 209, 0.6)",
                                        // borderBottom: "2px solid #7c60d1",
                                        paddingRight: "4px"
                                    }}
                                >
                                    L
                                </span>
                                <span>ost & </span>
                                <span
                                    style={{
                                        fontWeight: "800",
                                        fontSize: "3.2rem",
                                        fontStyle: "italic",
                                        background: "linear-gradient(to right, #8e7df2, #7e6df0)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        textShadow: "1px 1px 4px rgba(126, 109, 240, 0.6)",
                                        // borderBottom: "2px solid #7e6df0",
                                        paddingRight: "4px"
                                    }}
                                >
                                    F
                                </span>
                                <span>ound</span>
                            </h1> */}
                            <h1
                                style={{
                                    fontSize: "3.5rem",
                                    fontWeight: "600",
                                    letterSpacing: "1px",
                                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                                    margin: 0,
                                    whiteSpace: 'nowrap',
                                    color: "#5d396e",//#5d396e
                                    textShadow: "0px 6px 6px rgba(0, 0, 0, 0.2)", // cast-like bottom shadow
                                }}
                            >
                                <span
                                    style={{
                                        fontWeight: "800",
                                        fontSize: "5rem",
                                        fontStyle: "italic",
                                        background: "linear-gradient(to right, #a076f9, #7c60d1)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        textShadow: "0px 6px 6px rgba(124, 96, 209, 0.4)", // glass-like bottom shadow
                                    }}
                                >
                                    L
                                </span>
                                <span style={{ textShadow: "0px 6px 6px rgba(0,0,0,0.1)" }}>ost</span>
                                <span style={{
                                    fontStyle: "italic",
                                    color: "#ad4477"
                                }}>&</span>
                                <span
                                    style={{
                                        fontWeight: "800",
                                        fontSize: "5rem",
                                        fontStyle: "italic",
                                        background: "linear-gradient(to right, #a076f9, #7c60d1)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        textShadow: "0px 6px 6px rgba(126, 109, 240, 0.4)", // glass-like bottom shadow
                                    }}
                                >
                                    F
                                </span>
                                <span style={{ textShadow: "0px 6px 6px rgba(0,0,0,0.1)" }}>ound</span>
                            </h1>


                        </div>
                        <div>
                            <h3 style={{
                                color: "#e86691",
                                // fontWeight:"bold"
                                marginTop: "30px"
                            }}>
                                INTRODUCTION
                            </h3>
                        </div>
                        <div>
                            <p
                                style={{
                                    fontSize: "1.4rem",
                                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                                    color: "#2e2e2e",
                                    margin: "1rem 0",
                                    letterSpacing: "0.5px",
                                }}
                            >
                                Welcome to&nbsp;
                                <span>
                                    {/* L */}
                                    <span
                                        style={{
                                            fontWeight: "700",
                                            fontSize: "1.7rem",
                                            fontStyle: "italic",
                                            background: "linear-gradient(to right, #a076f9, #7c60d1)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                            textShadow: "0px 4px 5px rgba(160, 118, 249, 0.4)",
                                        }}
                                    >
                                        L
                                    </span>

                                    {/* ost */}
                                    <span
                                        style={{
                                            color: "#3a1e47",
                                            textShadow: "0px 4px 5px rgba(0, 0, 0, 0.1)",
                                            fontWeight: "500",
                                        }}
                                    >
                                        ost
                                    </span>

                                    {/* & */}
                                    <span
                                        style={{
                                            fontStyle: "italic",
                                            color: "#ad4477",
                                            fontWeight: "600",
                                            margin: "0 2px",
                                        }}
                                    >
                                        &amp;
                                    </span>

                                    {/* F */}
                                    <span
                                        style={{
                                            fontWeight: "700",
                                            fontSize: "1.7rem",
                                            fontStyle: "italic",
                                            background: "linear-gradient(to right, #a076f9, #7c60d1)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                            textShadow: "0px 4px 5px rgba(160, 118, 249, 0.4)",
                                        }}
                                    >
                                        F
                                    </span>

                                    {/* ound! */}
                                    <span
                                        style={{
                                            color: "#3a1e47",
                                            textShadow: "0px 4px 5px rgba(0, 0, 0, 0.1)",
                                            fontWeight: "500",
                                        }}
                                    >
                                        ound!
                                    </span>
                                </span>
                            </p>


                        </div>
                        <div style={{fontSize:"19px"}}>
                            <p>
                                <StyledTitle/> is a digital platform designed to reunite lost items with their rightful owners.
                                 Whether you've misplaced something valuable or found an item someone else might be missing,
                                  <StyledTitle/> makes it easy to connect finders and seekers in one convenient place.
                            </p>
                            <p></p>
                            <p>From posting detailed reports of lost belongings to listing found items with 
                                location and contact details, <StyledTitle/> ensures that nothing slips through the
                                 cracks. Its user-friendly design helps individuals quickly share and discover lost
                                  items, improving the chances of safe return.
                                  </p>
                            <p></p>
                            <p>Whether it's a forgotten phone, a dropped wallet, or a missing bag, <StyledTitle/> is your reliable
                                 partner in recovering personal items and helping others do the same — all with ease, clarity,
                                  and community support.
                                  </p>
                                  <p></p>
                                  <p>Let’s help each other reconnect with what matters most!</p>
                        </div>

                    </td>
                    <td><img src={homeImg} alt="lost&Found logo" /></td>
                </tr>
            </tbody>
        </table>
    );
};
