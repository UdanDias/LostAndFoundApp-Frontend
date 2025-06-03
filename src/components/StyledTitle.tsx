// components/StyledTitle.js
import React from 'react';

export const StyledTitle = () => {
    return (
        <>
            <span>
                {/* L */}
                <span
                    style={{
                        fontWeight: "700",
                        fontSize: "1.4rem",
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
                        fontSize: "1.4rem",
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
        </>
    );
}

