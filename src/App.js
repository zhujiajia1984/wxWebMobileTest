// 网址：https://test.weiquaninfo.cn/wxWebMobileTest
/* eslint-disable */
import React from 'react';
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';
import wx from 'wx';
import './styles/myStyles.less';


//
export default class App extends React.Component {
    //
    constructor(props) {
        super(props);
        this.state = {
            isShowPage: false,
            isBtnLoading: false,
            width_bgPic: 0,
            height_bgPic: 0,
        }
    }

    // 配置jssdk config
    async setConfig() {
        return await this.getSignInfo();
    }

    // 配置jssdk
    componentDidMount() {
        // 获取屏幕宽和高
        let width_bgPic = document.getElementById('root').clientWidth;
        let height_bgPic = width_bgPic * 791 / 480;
        this.setState({ width_bgPic: width_bgPic, height_bgPic: height_bgPic });

        //
        this.setConfig().then(signData => {
            // console.log(signData);
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: 'wxaed97ec85f7517ba', // 必填，公众号的唯一标识
                timestamp: signData.timestamp, // 必填，生成签名的时间戳
                nonceStr: signData.noncestr, // 必填，生成签名的随机串
                signature: signData.signature, // 必填，签名
                jsApiList: ['chooseImage', 'addCard'] // 必填，需要使用的JS接口列表
            });
            // jssdk ready / error
            wx.ready(function() {
                // console.log('success');

            });
            wx.error(function(res) {
                // console.log(res);
                this.setState({ isShowPage: false });
            });
            this.setState({ isShowPage: true });
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

    // 添加微信卡券
    addWxCard() {
        // status
        this.setState({ isBtnLoading: true });
        var that = this;

        // get sign
        let cardId = 'pMBhJ0g_felGMMBBDwrgDhx0FjyQ';
        let url = `https://test.weiquaninfo.cn/wxWebMobileTest/getCardSign?cardId=${cardId}`;
        fetch(url).then(res => {
            let contentType = res.headers.get("Content-Type");
            if (res.status == 200 && contentType && contentType.includes("application/json")) {
                return res.json();
            } else {
                throw new Error(`status:${res.status} contentType:${contentType}`);
            }
        }).then(jsonData => {
            // console.log(jsonData);
            // add card
            wx.addCard({
                cardList: [{
                    cardId: jsonData.cardId,
                    cardExt: jsonData.cardExt
                }],
                success: function(res) {
                    var cardList = res.cardList;
                },
                complete: function(res) {
                    that.setState({ isBtnLoading: false });
                },
            });

        }).catch(error => {
            console.log(error);
            alert("get card sign failed");
        })
    }

    // 
    onBtnClick(type, e) {
        switch (type) {
            case 'checkJsApi':
                {
                    wx.checkJsApi({
                        jsApiList: ['chooseImage', 'addCard'],
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
            case 'addCard':
                this.addWxCard();
                break;
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
                {
                    (this.state.isShowPage)?
                    <div style={{position: 'relative'}}>
                        <img src="https://test.weiquaninfo.cn/wxWebMobileTest/bgPic.jpg" 
                            style={{width: this.state.width_bgPic, height: this.state.height_bgPic}}
                        />
                        <div style={{position: 'absolute', top: 400, left: 10, right: 10}} className="btnSubmit">
                            <Button type="primary"
                                onClick={this.onBtnClick.bind(this, 'addCard')}
                                loading={this.state.isBtnLoading}
                            >
                            领取优惠券</Button>
                        </div>
                    </div>:""
                }                
            </div>
        );
    }
}