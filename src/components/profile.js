import * as React from 'react'

export default function Profile() {
    const divBlock = {
        width: '60%', // 長方形の幅を設定します
        height: '300px', // 長方形の高さを設定します
        backgroundColor: '#FCD59A', // 長方形の背景色を設定します
        display: 'flex', // Flexboxを使用して子要素を配置します
        justifyContent: 'center', // 子要素を中央に配置します
        alignItems: 'center', // 子要素を垂直方向の中央に配置します
        position: 'relative', // 子要素の位置を相対位置に設定します
    };
    const textStyle = {
        color: '#FCD59A', // テキストの色を設定します
        textDecoration: 'none', // テキストの下線を削除します
        fontFamily: 'Kaisei Opti, sans-serif', // フォントを設定します
        top: 0, // テキストを上に配置します
        left: '10px', // テキストを左に配置します
        paddingLeft: '10px', // 長方形の左パディングを設定します
        margin: '5px', // マージンを設定します
    };

    const centerStyle = {
        display: "block",
        alignItems: "left",
        position: 'relative', // 子要素の位置を相対位置に設定します
    }

    return (
        <div style={centerStyle}>
            <h2 style={textStyle}>Profile</h2>
            <div style={divBlock}>
                <span>Your Text Here</span>
            </div>
        </div>

    )
}