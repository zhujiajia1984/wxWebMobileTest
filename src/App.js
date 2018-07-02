// 网址：https://test.weiquaninfo.cn/wxWebMobileTest
/* eslint-disable */
import React from 'react';
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';
import wx from 'wx';
import './styles/myStyles.less';
// import { firstName, lastName, getFirstName } from './test';
// import * as test from './test';
// import getName from './test';


//
export default class App extends React.Component {
    //
    constructor(props) {
        super(props);
        this.test();
        // console.log(firstName);
        // console.log(lastName);
        // console.log(getFirstName());
        // console.log(test.firstName);
        // console.log(test.lastName);
        // console.log(test.getFirstName());
        // console.log(getName());
    }

    //
    test() {}

    // 配置jssdk config
    async setConfig() {
        return await this.getSignInfo();
    }

    // 配置jssdk
    componentDidMount() {
        this.setConfig().then(signData => {
            // console.log(signData);
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: 'wxaed97ec85f7517ba', // 必填，公众号的唯一标识
                timestamp: signData.timestamp, // 必填，生成签名的时间戳
                nonceStr: signData.noncestr, // 必填，生成签名的随机串
                signature: signData.signature, // 必填，签名
                jsApiList: ['chooseImage', 'onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
            });
            // jssdk ready / error
            wx.ready(function() {
                console.log('success');
                wx.onMenuShareAppMessage({
                    title: '123', // 分享标题
                    desc: 'abc', // 分享描述
                    link: 'https://test.weiquaninfo.cn/wxWebMobileTest', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: 'https://test.weiquaninfo.cn/images/baidu.jpg', // 分享图标
                    type: 'link', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function() {
                        // 用户确认分享后执行的回调函数
                        console.log('onMenuShareAppMessage success');
                    },
                    cancel: function() {
                        // 用户取消分享后执行的回调函数
                        console.log('onMenuShareAppMessage cancel');
                    }
                });
                wx.onMenuShareTimeline({
                    title: 'test', // 分享标题
                    link: 'https://test.weiquaninfo.cn/wxWebMobileTest', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: 'https://test.weiquaninfo.cn/images/baidu.jpg', // 分享图标
                    success: () => {
                        console.log("share success");
                    },
                    cancel: () => {
                        console.log("share cancel");
                    },
                    fail: (err) => {
                        console.log("share failed");
                    },
                    complete: () => {
                        console.log("share complete");
                    }
                })
            });
            wx.error(function(res) {
                console.log(res);
            });
        }).catch((error) => {
            console.log(error);
            alert("setConfig failed");
        });
    }

    // 获取签名信息（从服务器端）
    getSignInfo() {
        return new Promise((resolve, reject) => {
            let url = "https://test.weiquaninfo.cn/wxWebMobileTest/getConfigSign";
            fetch(url).then(res => {
                let contentType = res.headers.get("Content-Type");
                if (res.status == 200 && contentType && contentType.includes("application/json")) {
                    return resolve(res.json());
                } else {
                    return reject(new Error(`status:${res.status} contentType:${contentType}`));
                }
            })
        })
    }

    // 
    onBtnClick(type, e) {
        switch (type) {
            case 'checkJsApi':
                {
                    wx.checkJsApi({
                        jsApiList: ['chooseImage', 'onMenuShareTimeline', 'onMenuShareAppMessage'],
                        success: (res) => {
                            console.log(res);
                        },
                        fail: (err) => {
                            console.log(err);
                        }
                    });
                    break;
                }
            case 'chooseImage':
                {
                    wx.chooseImage({
                        count: 1, // 默认9
                        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                        success: function(res) {
                            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        }
                    });
                    break;
                }
            case 'navigateBack':
                {
                    wx.miniProgram.navigateBack();
                    break;
                }
            case 'onMenuShareAppMessage':
                {
                    // console.log('onMenuShareAppMessage begin');

                    break;
                }
            default:
                {
                    alert("no button type");
                }
        }
    }


    //
    render() {
        return (
            <div>
				<div className="name">
					my-test
				</div>
				<WingBlank>
					<WhiteSpace size= 'xl'/>
						<Button type="primary" onClick={this.onBtnClick.bind(this, 'checkJsApi')}>checkJsApi</Button>
					<WhiteSpace />
					<WhiteSpace size= 'xl'/>
						<Button type="primary" onClick={this.onBtnClick.bind(this, 'chooseImage')}>chooseImage</Button>
					<WhiteSpace />
					<WhiteSpace size= 'xl'/>
						<Button type="primary" onClick={this.onBtnClick.bind(this, 'navigateBack')}>backToMiniApp</Button>
					<WhiteSpace />
					<WhiteSpace size= 'xl'/>
						<span>右上角分享到朋友圈</span>
					<WhiteSpace />
					<WhiteSpace size= 'xl'/>
						<span>右上角分享给朋友</span>
					<WhiteSpace />
                    <div>
                        <img src="https://test.weiquaninfo.cn/hiyou.jpg"
                            style={{height: 258, width: 258}}
                        />
                    </div>
				</WingBlank>
			</div>
        );
    }
}