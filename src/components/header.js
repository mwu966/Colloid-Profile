import * as React from 'react'

/** @jsx jsx */
import { jsx } from "theme-ui"

export default function Header() {
    const linkStyle = {
        color: '#BB8B4B', // ここでリンクの色を設定します
        textDecoration: 'none', // リンクの下線を削除します
        marginRight: '70px', // 右側のマージンを追加します
        boxSizing: 'border-box' // パディングとボーダーを要素の幅と高さに含めます
    };

    return (
        <div
            sx={{
                // this uses the value from `theme.space[4]`
                padding: 4,
                // these use values from `theme.colors`
                width: "100%",
                color: "BB8B4B",
                borderTop: '1px solid  #BB8B4B', // 上側のボーダーを追加します
                 borderBottom: '1px double  #BB8B4B', // 下側のボーダーを追加します
                
            }}
        >
            <nav>
                <ul sx={{
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                    display: "flex",
                    justifyContent: "flex-end",
                }}>
                    <li sx={{ marginLeft: "20px" }}>
                        <a href="/link1" sx={linkStyle}>Link 1</a>
                    </li>
                    <li sx={{ marginLeft: "20px" }}>
                        <a href="/link2" sx={linkStyle}>Link 2</a>
                    </li>
                    <li sx={{ marginLeft: "20px" }}>
                        <a href="/link3" sx={linkStyle}>Link 3</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}