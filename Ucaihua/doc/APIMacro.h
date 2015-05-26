//
//  APIMacro.h
//  Ucaihua
//
//  Created by Ucaihua001 on 14-9-2.
//  Copyright (c) 2014年 中渠传媒. All rights reserved.
//

#ifndef Ucaihua_APIMacro_h
#define Ucaihua_APIMacro_h


//第一次登录后的Response.allHeaderFields
#define LoginResponseHeaderFields @"LoginResponseHeaderFields"


//HostName
#define HostName @"www.pccn.com.cn"
//#define HostName @"test.pccn.com.cn"//测试

#define Path @"/app.php"

//联系我们Path
#define ConnectUsPath @"/app.php?act=store&sid=4063"
//打电话统计接口
#define AddCallCountPath @"/app.php?act=add_call_count"

//LoginPath
#define LoginPath @"/app.php?act=login"
#define LogoutPath @"/app.php?act=login&op=logout"
///
#define RegisterCheckMobilePath  @"/app.php?act=register&op=check_mobile"
#define RegisterSendVerifyPath   @"/app.php?act=register&op=send_verify"
//old 注册接口
#define RegisterCheckMobileVerifyPath   @"/app.php?act=register&op=check_mobile_verify"
#define RegisterPath @"/app.php?act=register"

#define GetPasswordSendVerifyPath @"/app.php?act=get_password&op=send_verify"
#define GetPasswordUpdatePasswordPath @"/app.php?act=get_password&op=update_password"

//点评商店
#define AddStoreCommentPath @"/app.php?act=add_comment"
//dian
#define AddUserCommentPath @"/app.php?act=add_comment&op=lianxiren"

#define DeleteMyCommentPath @"/app.php?act=get_my_comment_list&op=delete"
//点赞个人
#define Api_Praise_Personal @"/app.php?act=lianxiren_pl&op=like&uid=%@&userid=%@"
//踩个人
#define Api_Step_Personal @"/app.php?act=step&op=userstep&id=%@"
//踩公司
#define Api_Step_Company @"/app.php?act=step&op=subject&id=%@"
//获取广告图
#define GetAdv @"get_adv"
//获取分类信息
#define GetCategory @"category"

//获取开通子站的城市列表
#define GetCityList @"get_city_list"
//获取商家列表
#define GetStoreList @"list"
//搜索商家
//#define SearchStoreList @"search"
//获取商家或个人 点评列表
#define GetCommentList @"get_comment_list"

//获取我自己所有点评过的列表
#define GetMyCommentList @"get_my_comment_list"

//相册
#define GetAlbum @"album"


#pragma mark -需求模块接口

//获取需求列表
#define GetDemandList @"get_demand_list"
//提交需求
#define AddDemandPath @"/app.php?act=demand&op=add"
//删除需求
#define DelDemandPath @"/app.php?act=demand&op=del"
//评论需求
#define AddDemandCommentPath @"/app.php?act=demand_comment&op=add"
//获取需求评论列表
#define GetDemandCommentList @"demand_comment"
//获取动态消息接口
#define GetDynamicDemandListPath @"/app.php?act=demand&op=list"
//点赞
#define AddLikeDemandPath @"/app.php?act=like&op=like_demand"
//点赞
#define GetDemandMessageUnreadPath @"/app.php?act=demand&op=unread"


//用户登陆
#define UserLogin @"login"
//用户登出
#define UserLoginOut @"logout"

/****************************Fy***********************************/

//获取店铺信息
//#define Api_Get_StoreDetail @"/app.php?act=store&sid=%@"
#define Api_Get_StoreDetail @"/app.php?act=subject&sid=%@"
//获取我关联的店铺
#define Api_Link_Stores @"/app.php?act=user_connect&action=get&uid=%@"
//关联店铺
#define Api_To_Link_Store @"/app.php?act=user_connect&action=add&uid=%@&sid=%@"
//删除关联店铺
#define Api_To_Del_linkStore @"/app.php?act=user_connect&action=del&uid=%@&sid=%@"
//同意关联店铺
#define Api_Agree_LinkStroe @"/app.php?act=user_connect&action=check&uid=%@&sid=%@"
//获取申请关联店铺的请求
#define Api_ApplytoLink_List @"/app.php?act=user_connect&action=getlist"
//注册
#define Api_Register_path  @"app.php?act=register"


//根据uid获取个人简单信息， 头像， 昵称
#define Api_GetSimpleUserInfo @"/app.php?act=get_user_info&op=group&uid=%@"
//根据uid获取个人信息，全部信息
#define Api_GetAllUerInfo @"/app.php?act=get_userinfo&uid=%@"
#define Api_GetUerSubjecList @"/app.php?act=get_user_subject_list&uid=%@"

//用户搜索
#define Api_SearchUser @"/app.php?act=search_user"
//申请为同行
#define Api_ApplyToPeerInfo @"/app.php?act=peernew&op=add"
//申请同行 && 名片
#define Api_ApplyToPeerNew @"/app.php?act=peernew&op=add_new"
//申请同行
#define Api_ApplyToPeerUpImg @"/app.php?act=peernew&op=upload"
//我的，添加店铺，获取分类信息
#define Api_GetCategoryList @"/app.php?act=category&catid=%@"
//添加店铺
#define Api_AddShop_New @"/app.php?act=add_subject&op=add"
//添加品牌
#define Api_Add_Store_Brand @"/app.php?act=add_subject&op=add_brand"
//修改店铺信息
//#define Api_EditShopInfo @"/app.php?act=add_subject&op=edit" 废弃
#define Api_EditShopInfo @"/app.php?act=subjectnew&op=edit"

//上传授权照片
#define Api_Upload_Img @"/app.php?act=subjectnew&op=upload&sid=%@"
#define Api_Upload_LienceImg @"/app.php?act=peernew&op=pic_upload"
//删除授权 或者 营业执照
#define Api_Delete_Img @"/app.php?act=subjectnew&op=del_pic&picid=%@"

//我添加的店铺, 包括未审核的
#define Api_MyAddShop @"/app.php?act=add_subject&op=list"
//获取店铺的详细信息
#define Api_GetShopDetailInfo @"/app.php?act=store&sid=%@"
//获取相册列表
#define Api_GetShopPhotoList @"/app.php?act=album&sid=%@"
//上传相册列表
#define Api_UploadShopImg @"/app.php?act=album&op=upload"
//删除相册列表
#define Api_DelShopImg @"/app.php?act=album&op=delete"
//获取价格表
#define Api_GetPriceTab @"/app.php?act=get_product_list&sid=%@&page_count=10&page=%d"
//增加 / 修改报价
#define Api_AddOrEditPrice @"/app.php?act=edit_product"
//删除报价
#define Api_DelPrice @"/app.php?act=edit_product&op=del&id=%@"
//访客
#define Api_Visitor_list @"/app.php?act=visitor&id=%@&idtype=member"
//我的渠道好友
#define Api_GetMyProductFriend @"/app.php?act=core_baojia&sid=%@"

//删除渠道好友
#define Api_DelMyProductFriend @"/app.php?act=core_baojia&op=del&id=%@"
//搜索渠道好友
#define Api_SearchProductFriend @"/app.php?act=search_user"
//授权添加渠道好友
#define Api_AddParterFriend @"/app.php?act=core_baojia&op=add"

//修改个人用户信息

#define Api_Modify_Personal_Info  @"/app.php?act=edit_user_info"
//修改公司信息
#define Api_Modify_Company_Info @"/app.php?act=userinfo&op=save"
//#define Api_Modify_Company_Info @"/app.php?act=peernew&op=update_company"

//修改真实名字
#define Api_Modify_Persional_Info_RealName @"/app.php?act=modify_info&op=real_name"//&real_name=%@&uid=%@
//修改邮箱
#define Api_Modify_Persional_Info_Email @"/app.php?act=modify_info&op=email&email=%@&uid=%@"
//修改用户名
#define Api_Modify_Persional_Info_UserName @"/app.php?act=modify_info&op=username"
//上传头像
#define Api_Modify_Persional_Info_UserPhoto @"/app.php?act=modify_info&op=upload_icon"
//修改性别
#define Api_Modify_Persional_Info_Gender @"/app.php?act=modify_info&op=gender"//&gender=%@&uid=%@
//修改个性签名
#define Api_Modify_Persional_Info_Signature @"/app.php?act=modify_info&op=signature"//&signature=%@&uid=%@
//修改地区 //弃用
#define Api_Modify_Persional_Info_Address @"/app.php?act=modify_info&op=aid"//&aid=%@&uid=%@


//修改电话--- 旧手机号获取验证码
#define Api_Modify_Mobile_GetOldAuthCode @"/app.php?act=modify_mobile&op=send_verify"
//修改电话--- 检查手机号和获取的验证码  - 旧手机号
#define Api_Modify_Mobile_CheckOldAuthCode @"/app.php?act=modify_mobile&op=check_mobile"
//修改电话--- 旧手机号获取验证码 -- 新手机
#define Api_Modify_Mobile_GetNewAuthCode @"/app.php?act=modify_mobile&op=send_new_verify"
//修改电话--- 检查手机号和获取的验证码  -- 新手机
#define Api_Modify_Mobile_CheckNewAuthCode @"/app.php?act=modify_mobile&op=update_mobile"


//获取城市列表
#define Api_GetCitiesList @"/app.php?act=get_city_list1"

//获取我的好友  (liaot）
#define Api_Get_MyFriends @"/app.php?act=friends&uid=%@"
//删除我的好友 (聊天）
#define Api_Del_MyFriend @"/app.php?act=friends&op=del&fid=%@"
//成为好友 （聊天好友）
#define Api_Be_Friend @"//app.php?act=friends&op=to_friends&uid=%@&fid=%@"
//获取店铺
#define Api_Get_StoreList @"/app.php?act=list"
//删除店铺
#define Api_Del_Shop @"/app.php?act=subjectnew&op=del&id=%@"
//获取列表, 类型列表
#define Api_Get_TypeList @"/app.php?act=category&att=%@"
//获取类型列表
#define Api_Get_AllType_List @"/app.php?act=category_new&catid=all"
//获取商店列表
//#define Api_Get_StoreList @"app.php?act=list&catid=%@&orderby=%@"

//首页数据
#define Api_HomeRecommendStore_List @"/app.php?act=recommend_subject"
#define Api_Person_list @"/app.php?act=person_list"
#define Api_Person_Detail @"/app.php?act=get_userinfo&uid=%@"

//获取报价表
#define Api_Get_PirceTable @"/app.php?act=get_product_list&sid=%@&op=list&page=%d"
//踩商家
#define Api_Cai_Stroe @"/app.php?act=step&op=subject&id=%@"
//赞商家
#define Api_Zan_Stroe @"/app.php?act=like&rid=%@&uid=%@"
//搜索产品
#define Api_Search_Product @"/app.php?act=search_product"
//添加商品到购物车
#define Api_AddProductToCart @"/app.php?act=shopping_cart&op=add"
//获取我的购物车列表
#define Api_Get_CartList @"/app.php?act=shopping_cart&op=list"
//删除购物车的记录
#define Api_Del_CartProduct @"/app.php?act=shopping_cart&op=del"
//产品详情
#define Api_Get_ProductDetail @"/app.php?act=product&id=%@"
//生成订单
#define Api_confirm_Order @"/app.php?act=checkout&op=confirm"
//获取订单地址
#define Api_Get_OrderAddress @"/app.php?act=checkout&op=address_list"
//新建订单地址
#define Api_New_OrderAddress @"/app.php?act=checkout&op=address_add"
//获取默认地址
#define Api_Get_DefaultAddress @"/app.php?act=checkout&op=shipping"
//获取有多少条未读的It资讯
#define Api_Get_CountOfItNews @"/app.php?act=article&op=unread"
//获取用户类型
#define Api_Get_type @"/app.php?act=c_type"
//用户关注的产品, 这个跟消息定制是一样的，是以前消息定制直接改用成  关注的产品了
#define Api_Attent_Product @"/app.php?act=custom_made&op=save"
//获取 某人  对公司的评论
#define Api_reviews_company @"/app.php?act=reviews&uid=%@"
//我关注的 // id  idtype:要关注的对象类型 member 用户 subject 店铺
#define Api_favorite_person @"/app.php?act=favorite"
//搜索店铺
#define Api_Search_Store @"/app.php?act=search"
//搜索关联店铺
#define Api_Search_Link_Search @"/app.php?act=connect_search"
//搜索卖家
#define Api_Search_Seller @"/app.php?act=searchperson"
//反馈接口
#define Api_Feed_Backe @"/app.php?act=feed"

//*************************消息定制**************************

//我的关注产品
#define Api_my_attention @"/app.php?act=attention"
//添加 修改 推送
#define Api_PushMsg_Save @"/app.php?act=custom_made&op=save"

//添加定制
#define Api_PushMsg_Add @"/app.php?act=custom_made&op=add"
//更新定制
#define Api_PushMsg_Edit @"/app.php?act=custom_made&op=edit"
//删除消息定制
#define Api_PushMsg_Del @"/app.php?act=custom_made&op=del"
//消息定制列表查询
#define Api_PushMsg_query @"/app.php?act=custom_made"

//商家详情网页
#define Api_Share_StoreDetail @"http://www.pccn.com.cn/app_web/shangjia.php?sid=%@"
//it资讯
#define Api_It_NewsList  @"/app.php?act=article&op=list&page=%d"
//***********************个人版****************************/
//添加/修改我的IT产品
#define Api_AddModify_ItProduct @"/app.php?act=myproduct&op=edit"
//添加It产品图片
#define Api_AddProduct_Img @"/app.php?act=myproduct&op=upload"
//删除it产品
#define Api_Del_Product @"/app.php?act=myproduct&op=del"
//删除It产品图片
#define Api_DelProduct_Img @"/app.php?act=myproduct&op=del_pic"
//获取It产品列表
#define Api_Load_ItProduct_list @"/app.php?act=myproduct&op=list"
//个人版本商家搜索接口
#define Api_PSearch_Store @"/app.php?act=p_search"
//个人版发需求搜索
#define Api_Search_Demand @"/app.php?act=demand&op=search&page=%d"

//









//后台检查更新
#define Api_Check_Update @"/app.php?act=check_update"
//从ITuneStore检查程序的更新
#define ITUNES_CHECK_UPDATE @"/lookup?id=%@"//826328163



#endif
