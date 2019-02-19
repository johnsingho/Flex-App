﻿/**
 * 默认程序设置 会被写如localStorage
 */

//开关
//是否本地开发调试
var IsDebugMode = false; //false;

//是否显示详细升级信息
var IsShowUpdateDetial = false; //false;

//是否显示升级安装失败信息
var IsShowUpdateInstalledErr = true;

//新的测试页面控制，与 actionVisitServices, ESE_ACTION_UPDATE表配合使用
//  $scope.canUseAction = function (action) {
//     return actionVisitServices.canUseAction(action, $rootScope.accessEmployee.WorkdayNO);
// };
 ///////////////////////////////////////////////////////////////////////////////////
function isSouthCamp(org){
    return /b13|b6|b16/i.test(org);
}
function isMultek(org){
    return /multek/i.test(org);
}
function isMech(org){
    return /mech/i.test(org);
}
function isB11(org){
    return /b11/i.test(org);
}

function isChineseLang(vRootScope){
    return vRootScope.Language==ZH_CN;
}
function isEmptyString(str){
    return !str || 0==str.length;
}

function isValidMobile(str){
    return /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(16[0-9]{1}))+\d{8})$/.test(str);
}
///////////////////////////////////////////////////////////////////////////////////

if (IsDebugMode) {
    //本机开发
    var API_HOST = 'http://localhost:64511';
} else {
    //正式环境
    var API_HOST = 'https://zhmobile.flextronics.com/EvaluationApp';
}

var API = {

    GetMealList:API_HOST+'/MealOrder.ashx?action=GetMealList',

    GetMyRedEnvelopLog: API_HOST + '/EvaluationAppService.ashx?action=GetMyRedEnvelopLog',

    GetResearchList:API_HOST+'/ResearchService.ashx?action=GetResearchList',

    GetsResearchHtml:API_HOST+'/ResearchService.ashx?action=GetResearchHTML',

    GetsResearchDetails:API_HOST+'/ResearchService.ashx?action=GetsResearchDetails',

    ResearchSubmit:API_HOST+'/ResearchService.ashx?action=Submit',

    GetChoujiangGuestList:API_HOST+'/ChoujiangService.ashx?action=GetChoujiangGuestList',

    CheckHaveChoujiangShow:API_HOST+'/ChoujiangService.ashx?action=CheckHaveChoujiangShow',

    Choujiang:API_HOST+'/ChoujiangService.ashx?action=Choujiang_ABC',

    LightControl:API_HOST+'/LightService.ashx?action=LightControl',

    Version:API_HOST+'/UpdateService.ashx?action=Version',

    User_Login:API_HOST+'/EvaluationAppService.ashx?action=Login',

    PointsInfo: API_HOST + '/EvaluationAppService.ashx?action=GetEmployee',

    GetSlideImg:API_HOST+'/EvaluationAppService.ashx?action=GetHomeSlideImg',

    GetMsgCount: API_HOST + '/MsgService.ashx?action=GetMsgCount',

    GetMsgList: API_HOST + '/MsgService.ashx?action=GetMsgList',

    UpdateMsgStatus: API_HOST + '/MsgService.ashx?action=UpdateMsgStatus',

    GetNoticeList: API_HOST + '/MsgService.ashx?action=GetNoticeList',

    GetNoticeHTML: API_HOST + '/MsgService.ashx?action=GetNoticeHTML',

    GetActivityList: API_HOST + '/MsgService.ashx?action=GetActivityList',

    GetActivityHTML: API_HOST + '/MsgService.ashx?action=GetActivityHTML',

    GetActivityDetails: API_HOST + '/MsgService.ashx?action=GetActivityDetails',

    SubmitActivity: API_HOST + '/MsgService.ashx?action=SubmitActivity',

    RuleDETAIL: API_HOST + '/EvaluationAppService.ashx?action=GetEvaluateDetails',

    GetGoldIdeaType: API_HOST + '/EvaluationAppService.ashx?action=GetGoldIdeaType',

    GetGoldIdeaRecode: API_HOST + '/EvaluationAppService.ashx?action=GetGoldIdeaRecode',

    GetGoldIdeaShow: API_HOST + '/EvaluationAppService.ashx?action=GetGoldIdeaShow',

    getGoodEmployee:API_HOST + '/EvaluationAppService.ashx?action=GetGoodEmployee',

    addGoodEmployeeLike:API_HOST + '/EvaluationAppService.ashx?action=AddGoodEmployeeLike',

    Submit: API_HOST + '/EvaluationAppService.ashx?action=Submit',

    SubmitGoldIdea: API_HOST + '/EvaluationAppService.ashx?action=SubmitGoldIdea',

    SubmitSpecialPropose: API_HOST + '/EvaluationAppService.ashx?action=SubmitSpecialPropose',

    GetRedEnvelopLog: API_HOST + '/EvaluationAppService.ashx?action=GetRedEnvelopLog',

    PointsHistory: API_HOST + '/EvaluationAppService.ashx?action=GetPointsHistory',

    GetChartRank: API_HOST + '/EvaluationAppService.ashx?action=GetChartRank',

    OperationLog: API_HOST + '/EvaluationAppService.ashx?action=OperationLog',

    GetAskAndAnswer: API_HOST + '/EvaluationAppService.ashx?action=AskAndAnswer',

    getKq: API_HOST + '/KqcxService.ashx?action=GetKQ',

    getCustRec:API_HOST + '/KqcxService.ashx?action=GetCustRec',

    getCustOddfare:API_HOST + '/KqcxService.ashx?action=GetCustOddfare',

    GetSecurityCode: API_HOST + '/AccountService.ashx?action=GetSecurityCode',

    CheckSecurityCode: API_HOST + '/AccountService.ashx?action=CheckSecurityCode',

    Register: API_HOST + '/AccountService.ashx?action=Register',

    GetForgetPswSecurityCode: API_HOST + '/AccountService.ashx?action=GetForgetPswSecurityCode',
    GetPhoneSecurityCode: API_HOST + '/AccountService.ashx?action=GetPhoneSecurityCode',

    RestPassword: API_HOST + '/AccountService.ashx?action=RestPassword',

    //EHS activity
    GetEHSActList: API_HOST + '/EHSActService.ashx?action=GetEHSActList'


};

var SETTING = {
    version: '0.1.1',
    avatar: {
        enabled: true,
        hd: false
    },
    image: {
        enabled: true,
        hd: false
    },
    tail: '\n----------\n',
    reset: false // 重大版本更新，需要重置客户端设置
};

//语言
var ZH_CN = {
    common:{
        memo:"备注",
        Explain:"说明",
        Description:"描述",
        reason:"原因",
        grade:"薪资级别",
        yuan:"元",
        InfoProvideIDNO:"请提供身份证号码!",
        CommunicationErr:"通讯异常，请稍候再试!",
        picture: "照片",
        takePhoto: "拍照",
        selectPhoto:"从相册中选取",
        clear:"清除",
        NoData:"没有相关数据。",
        Cancel:"取消",
        email:"邮箱",
        sex:"性别",
        sexMale:"男",
        sexFeMale:"女",
        month:"月份",
        year:"年份",
        workdayNO:"工号",
        name:"姓名",
        income:"收入",
        totalIncome:"总收入",
        expenditure:"支出",
        balance:"余额",
        mobile:"手机号码",
        Reply:"回复",
    },
    signin: {
        username: "工号",
        password: "密码",
        register : "注册",
        forgetPassword: "修改密码",
        rebindPhone: "更改手机号"
    },
    menu:{
        homePage:"首页",
        back:"返回",
        submit:"提 交",
        wait:"请稍等..."
    },
    tab:{
        home:"首页",
        myMsg:"我的消息",
        myFlex:"我的Flex+",
        msgTitle:"通知消息"

    },
    home: {
        home:"首页",
        evaluation:"自 评",
        evaluation1:"有奖自评",
        goldenidea:"金点子",
        like:"为TA点赞",
        help:"我要求助",
        kqcx:"考勤查询",
        xfcx:"消费查询",
        rexian:"热线电话",
        zhaoping:"内部招聘",
        gonggao:"通知公告",
        activity:"活 动",
        shareCar:"拼 车",
        survey:"问卷调查",
        train:"培 训",
        egate:"E-gate",
        handbook:"员工手册",
        apply:"报 名",
        insurance:"商业保险",
        GBS:'人事综合',
        admin:"行政",
        earthday:"地球周",
        dormManage:"宿舍管理",
        union:"工会之窗",
        mechCharity:"MECH基金会",
        CSER:"CSER企业社会环境责任",
    },
    myFlex:{
        employee_ID: "工号",
        segment: "事业部",
        realName: "实名制",
        balance: "余额",
        changePassword: '修改密码',
        cancellation: '注销',
        signOut:'退出',
        version:"软件版本："
    },
    realName: {
        title: "请进行实名制认证",
        title1: "以免无法使用新功能",
        type: "类型",
        chinese: "中国",
        foreigner: "外国",
        idNO: "身份证",
        name: "姓名"
    },
    evaluation:{
        tabRule:"评分",
        tabRecord:"记录",
        tabSort:"排行榜",
        tabMyPoint:"我的评分",
        startButton:"点我开始",
        sel:"请选择：",
        ps:"此项功能暂时未对你所在的事业部开放，敬请期待",
        sortMonth:"月度积分排行",
        sortYear:"年度积分排行",
        scoringRecord:"评分记录",
        integral:"获得积分",
        redbag: "获得红包",
        time:"时间",
        scor:"分",
        money:"元",
        myPiont:"我的评分",
        sortInfo:"积分详情",
        sortByToday:"今日积分",
        sortByWeek:"本周积分",
        sortByMonth:"月度积分",
        sortByYear:"年度积分",
        moneyAccount:"钱包余额",
        detail:"明细记录"
   },
    goldenIdea:{
        tabGoldenIdea:"金点子",
        tabSelIdea:"金点子精选",
        tabSort:"排行榜",
        tabMyIdea:"我的金点子",
        title:"员工金点子",
        jgss:"金光闪闪",
        jgssContent:"优秀金点子选登和介绍近期金点子状况",
        departmental:"你想对他建议",
        department1:"生产运营类(生产流程/品质管理)",
        department2:"行政类(饭堂/宿舍/卫生/车队/医务等)",
        department3:"安全类(治安/门禁/安检/职业健康等)",
        department4:"认识类(考勤/社保/公积金/薪酬/培训等)",
        Idea:"你的金点子",
        IdeaContent:"包含目前现状/存在的问题点，通过什么方法/途径改进/提升等"
    },
    like:{
        title:"为TA点赞",
        content:'你身边还有哪些人值得你点“赞”，请描述赞“点”：',
        name:"姓名",
        nameContent:'被推荐人的姓名',
        employee_ID:"工号",
        employee_IDContent:"被推荐人的工号",
        department:"部门",
        departmentContent:"被推荐人部门",
        content:"请详细填写主要事迹（字数不少于50字）",
        ps:"注：入选者将获得丰厚奖金，相应推荐人获得精美礼品一份"
    },
    help:{
        title:"我要求助",
        mobile:'联系电话',
        content:"具体描述遇到的困难或者问题",
        tabHelp:"我要求助",
        tabMyhelp:"我的求助"
    },
    kqcx:{
        tabKqcx:"考勤记录",
        tabAbnormal:"考勤异常",
        kqycTitle:"考勤异常查询",
        abnormalType:"异常类型",
        int:"进",
        out:"出",
        late: "迟到次数",
        lateTime: "迟到分钟",
        leaveearly: "早退次数",
        leaveearlyTime: "早退分钟",
        absenteeism: "旷工次数",
        absenteeismTime: "旷工小时",
        workingHours:"实际工时",
        attendanceTime:"出勤时间",
        compassionateleave:"事假（小时）",
        sickLeave:"病假（小时）",
        injuryLeave:"工伤假（小时）",
        fullpay:"全薪假（小时）",
        OT:"加班",
        date:"日期",
        title:"考勤查询",
        selDay:'选择时长',
        threeDay:'三天',
        sevenDay:'七天',
        oneMonth:'一个月',
        twoMonth:'两个月',
        title2:'考勤记录，共',
        title3:'条',
        content:"请遵循公司信息保密政策，未经授权严禁转载分享"
    },
    certificate:{
        title:'自助办证',
        incomeCertificate:'收入证明',
        certificateOfEmployment:'在职证明',
        certificateOfTakingLeave:'休假证明（仅供商业保险使用）',
        reissueWorkingCard:'厂牌补办',
        Use:"用途",
        Reason:'原因',
        Explain:'说明',
        UseContent:"购房/购车/信用卡申请/资格考试/居住证/商业保险申报"
    },
    GBSHR:{
        LTP:'LTP密码重置',
        basicGuide:'菜鸟手册',
        SocialInsurance:'社会保险',
        HousingFund: '住房公积金 & 个税',
        EmployeeDismiss: '离职须知',
        DismissIntro: '离职手续简介',
        DismissStatus: '离职手续状态查询',
        DismissIntro_SOUTH: '南厂',
        DismissIntro_NORTH: '北厂',
        DismissIntro_FOREIGN: '外籍',
        DismissLastDay: '最后工作日',
        DismissBeginDay: '启动办理日期',
        Status: '状态',
        NoStatus: '只有正在办理离职的员工才有这些状态!',
        Done: '办结',
        Required: '待办',
        LostFound: '失物招领',
    },
    xfcx:{
        title:"消费查询",
        selDay:'选择时长',
        threeDay:'三天',
        sevenDay:'七天',
        oneMonth:'一个月',
        twoMonth:'两个月',
        title2:'消费记录，共',
        title3:'条，卡余额：',
        title4:'元',
        piont:'地点：'
    },
    bus:{
        title:"班车信息",
        content:'其他车辆会在后续增加定位信息',
        tabGps:'班车定位',
        tabBusTime:'班车时刻表'
    },
    rexian:{
        title:"热线电话",
        button:'拨打电话'
    },
    gonggao:{
        title:"通知公告"
    },
    activity:{
        title:"活动"
    },
    meal:{
        title:"中央餐厅 点餐",
        tabMeal:"点餐",
        tabMobile:"联系方式",
        restaurantPhone:"餐厅电话",
        tabMyMeal:"我的订单",
        MyMealTitle:"我的订单"
    },
    shareCar:{
        title:"拼车",
        tabCar:"共享汽车",
        tabMy:"我的",
        button:'发布',
        MylTitle:"我的订单",
        carer:"我是车主",
        passenger:"我是乘客",
        mobile:"联系电话",
        carNo:'车牌号',
        startPoint:"起点",
        EndPoint:"终点",
        midPoint:"途经点",
        startTime:"开始时间",
        endTime:'结束时间',
        seatCoun:"座位数",
        select:"请选择",
        Remarks:"详细描述",
        RemarksContent:"备注"
    },
    survey:{
      title:"调查"
    },
    handbook:{
      title:"语言",
      title1:"员工手册"
    },
    apply:{
        title:"报名"
    },
    insurance:{
        title:"商业保险"
    },
    register: {
        title:"注册",
        mobile:"手机号码",
        btnVerificationCode: "获取验证码",
        VerificationCode: "验证码",
        ps: "如果收不到短信，请检查手机安全设置或者安全软件是否将短信拦截",
        btnSubmit: "确定",
        passwordRemark: "请设置密码：",
        duplicatePassword: "重复密码"
    },
    forgetPassWord: {
        title:"忘记密码",
        title1:"修改密码",
        mobile: "注册的手机号码",
        currentPassword:"当前密码",
        newPassword:"新密码",
        duplicatePassword:"重复密码"
    },
    rebindPhone:{
        title:"修改绑定手机号",
        newPhone:"新手机号码",
        errWorkdayNo:"工号必须要填上",
        errMobile:"手机号有问题",
        errIdno:"身份证号必须要填上",
        ExplainTxt:"适用于已实名制的用户更换手机号码"
    },
    CSER:{
        cserDate:"CSER日历",
        cserDatePrompt:"可点击相关主题进行报名",
        DateEnd:"结束日期",
        calender:"CSER日历",
        kidsCaring:"托管",
        sumwinCamp:"夏令营/冬令营",
    },
    activityGood:{
        title:"南厂餐厅一楼档口风味满意度调查",
        name:"姓名",
        employee_ID:"工号",
        department:"部门",
        designer:"作者",
        desc:"主要事迹",
        designConcept: "设计理念"
    },
    ehsAct:{
        title:"EHS有奖答题"
    },
    admin:{
        bus:"班车信息",
        meal:"订 餐",
        icCardLost:"挂失IC卡",
        dorm:"宿 舍",
        promptTitle:"提示",
        promptOK:"确定",
        promptCancel:"取消",
        promptReportLost:"确定要挂失你的IC卡？",
        lastRequest:"最近一次申请",
        submitSucc:'您的挂失申请已提交，正在等待一卡通后台处理，谢谢！',
        canteenMenu:'餐厅菜单',
    },
    dormManage:{
        housingAllowance:"住房津贴",
        checkInState:"是否住宿",
        checkOutDate:"退房日期",
        hiredDate:"入职日期",
        allowanceSucc:"住房津贴申请成功, 生效日期:",
        applyDorm:"宿舍申请",
        hasHousingAllowance:"正在享有住房补贴",
        requireType:"入住类型",
        requireReason:"入住理由",
        chargingDefine:"费用查询",
        dormArea:"宿舍区",
        applyDormSucc:"您的住宿申请已经提交到宿舍管理组，后续请留意“我的信息”，查收最新进度通知",
        rcenetMonth:"最近一个月",
        noFeeRecord:"没有扣费记录",
        dormMap:"宿舍地图",
        dormNotice:"宿舍公告",
        dormNoticeProtocol:"入住需知",
        repairDorm:"宿舍报修",
        reissueKey:"补办钥匙",
        dormAddress:"具体地址",
        repairTime:"预约时间",
        deviceType:"待维修设备",
        repairDesc:"报修内容",
        keyType:"钥匙类型",
        repairDormSucc:"您的报修申请成功！<br>请保持手机通讯畅通，以便联系",
        reissueKeySucc:"您的补办钥匙申请已经提交到宿舍管理组，后续请留意“我的信息”，查收最新进度通知",
        totalMoney:"总金额",
        freeDormWifi:"免费WIFI申请",
        dormAskAndAns:"宿舍常见问题",
        dormSuggest:"建议箱",
        yourSuggest:"您的建议",
        hisSuggest:"以前的建议",
        suggestSucc:"感谢您的建议!",
        respSuggest:"回复",
    },
    union:{
        communicate:"员工沟通",
        welfare:"员工福利",
        activity:"工会活动及报名",
        helpSupport:"员工帮扶",
        wonderfulMoment:"精彩瞬间",
        suggest:"建议留言",
        hotline:"热线号码",
        otherCommunMethod:"其他沟通渠道",
        welfare_fest:"年节福利",
        welfare_union:"工惠福利汇",
        welfare_dmUnion:"斗门公众号福利",
        welfare_notice:"领取通知",
        welfare_applyResult:"补贴申请结果查询",
        welfare_old:"工惠福利汇往期福利",
        AttendAct:"一键报名",
        ActTime:"活动时间",
        ActVenue:"活动地点",
        ActDateBegin:"报名起始",
        ActDateEnd:"报名截止",
        mySuggest:"我的留言",
        openSuggest:"他们说",
        carTicket:"春运汽车票团购",
    },
    mechCharity:{
        introduce:"简介",
        activity:"活动报名",
        wonderfulMoment:"活动报道",
        accountingPublic:"账务公示",
        research:"问卷调查",
        arch:"组织架构",
        projArch:"项目体系",
        AttendAct:"志愿者报名",
        manageEmail:"上司联系邮件",
        favourite:"兴趣爱好",
        pastActivities:"过去参加过的志愿活动类型",
        freeTime:"可出席时间",
        moneyPublic:"资金捐赠公示",
        materialPublic:"物资捐赠公示",
        yearAccountingPublic:"年度账务报告",
        donation:"捐款金额(元)",
        donationMaterial:"捐赠物资",
        infoSelectMon:"请选择月份!",
        infoSelectYear:"请选择年份!"
    },
    lostFound:{
        tabMy:"我的发布",
        public:"发布",
        lost:"寻找失物",
        found:"拾金不昧",
        lostFoundPublic:"失物寻主",
        msgPublicSuccess:"发布成功!",
        closePublic:"关闭发布",
        relatePhoto:"相关照片",
        Publisher:"发布者",
        PublishTime:"发布时间",
        goodName:"物品名称",
        curLoc:"目前位置",
        phone:"保管人电话",
    },
    eAdmin:{
        RequisitionFormInfo:'申请表内容',
        Company:'公司',
        Segment:'事业部',
        Department:'部门',
        Project:'项目',
        DeptApprover:'部门审批',
        CostCenter:'成本中心',
        OccupantInfo:'居住者信息',
        Name:'姓名',
        Gender:'性别',
        Nationality:'国籍',
        EmployeeID:'工号',
        Level:'级别',
        EmailAddress:'邮箱',
        CheckinTime:'入住时间',
        CheckoutTime:'退宿时间',
        TelNo:'电话号码',
        TypeOfApply:'入住类型',
        TypeOfRoom:'房间类型',
        WithFamilyMembers:'是否带家属',
        WithHousingSubsidy:'是否有住房津贴',
        FamilyMemberInfo:'家属信息',
        AgreeFamilyRegulations:'是否同意协议',
        ContactPerson:'联系人',
        ContactEmployeeID:'联系人工号',
        ContactNo:'联系人电话',
        Remark:'备注',
        Applicant:'申请人',
        SubmitDate:'提交时间',
        FilledbyCampusAdministration:'行政部填写',
        DormArea:'宿舍区',
        RoomNo:'房号',
        ApprovalRecord:'审批记录',
        ApprovalAction:'审批节点',
        Approver:'审批人',
        ApproveStatus:'审批状态',
        Action:'操作',
        ApprovedTime:'审批时间',
        Approve:'批准',
        Reject:'拒绝',
        RasierName:'提单人',
        ApplyReason:'申请原因',
        CostChangeTo:'费用承担',
        TotalCost:'总金额',
        FromCompany:'来自公司',
        JoinDate:'入职日期',
        Mobile:'电话',
        JobGrade:'级别',
        LiveInDorm:'是否住宿',
        FilledbyDormGroup:'宿舍组更新信息',
        SubsidyEffDate:'津贴生效日期',
    }
};

var ZH_US = {
    common:{
        memo:"memo",
        Explain:"explain",
        Description:"Description",
        reason:"reason",
        grade:"grade",
        yuan:"RMB",
        InfoProvideIDNO:"The IDNO is required!",
        CommunicationErr:"Communication error, please retry later!",
        picture: "Picture",
        takePhoto: "Take photo",
        selectPhoto:"Select from Album",
        clear:"Clear",
        NoData:"No data yet.",
        Cancel:"Cancel",
        email:"E-mail",
        sex:"Gender",
        sexMale:"Male",
        sexFeMale:"Female",
        month:"month",
        year:"year",
        workdayNO:"WorkdayNo",
        name:"Name",
        income:"Income",
        totalIncome:"Total Income",
        expenditure:"Expenditure",
        balance:"Balance",
        mobile:"Mobile",
        Reply:"Reply",
    },
    signin: {
        username: "Employee ID",
        password: "Password",
        register : "Register",
        forgetPassword: "Change Password",
        rebindPhone: "Change Binding Mobile"
    },
    menu:{
        homePage:"Home Page",
        back:"Return",
        submit:"Submit",
        wait:"please wait..."
    },
    tab:{
        home:"Home Page",
        myMsg:"My Information",
        myFlex:"My Flex+",
        msgTitle:"Announcement"

    },
    home: {
        home:"Home Page",
        evaluation:"Self- Evaluate",
        evaluation1:" Self-Appraisal ",
        goldenidea:"Golden Idea",
        like:" Thumb Up for “Him/Her” ",
        help:"Ask for Help",
        kqcx:"Attendance Inquiry",
        xfcx:"Consumption Inquiry",
        rexian:" Hotline Query",
        zhaoping:"Internal Hiring",
        gonggao:"Announcement",
        activity : "Activities",
        shareCar:"Car Sharing",
        survey: "Survey",
        train: "Training",
        egate: "E-gate",
        handbook: "Employee Handbook",
        apply: "Sign Up",
        insurance: "Commercial Insurance",
        GBS:'HR',
        admin:"Admin",
        earthday:"Earth Week",
        dormManage:"Dormitory Management",
        union:"Flex Union",
        mechCharity:"MECH Charity",
        CSER:"CSER",
    },
    myFlex:{
        employee_ID: "Employee ID",
        segment: "Segment",
        realName: " Real-Name Authentication ",
        balance: "Balance Inquiry",
        changePassword: 'Change Password',
        cancellation: 'Log Out',
        signOut:'Sigh Out',
        version: "Software Version："
    },
    realName: {
        title: "Please finish the real-name authentication ",
        title1: "Or you cannot access to new functions",
        type: "Type",
        chinese: "Chinese",
        foreigner: "Non-Chinese",
        idNO: "Identification Card",
        name: "Name"
    },
    evaluation:{
        tabRule:" Self- Evaluate ",
        tabRecord:"Records",
        tabSort:"Rank List",
        tabMyPoint:"My Score",
        startButton:"Click to Start",
        sel:"Plase Select：",
        ps:"Sorry, this function has not opened to your segment. ",
        sortMonth:" Rank list by month",
        sortYear:" Rank list by year",
        scoringRecord:" History records ",
        integral:" Scores",
        redbag: " Red packets",
        time:"Time",
        scor:" score",
        money:" RMB",
        myPiont:"My Score",
        sortInfo:"Details",
        sortByToday: "Scores by today",
        sortByWeek:"Scores by this week",
        sortByMonth:"Scores by this month",
        sortByYear:"Scores by this year",
        moneyAccount:"My Balance",
        detail :"Detail Information"
    },
    goldenIdea:{
        tabGoldenIdea:"Golden Idea",
        tabSelIdea:"Golden Idea",
        tabSort:"Rank List",
        tabMyIdea:"My Idea",
        title: "Golden Idea by employee",
        jgss:"Glittering",
        jgssContent:"Excellent golden idea",
        departmental: "What you want to suggest",
        department1:"生产运营类(生产流程/品质管理)",
        department2:"行政类(饭堂/宿舍/卫生/车队/医务等)",
        department3:"安全类(治安/门禁/安检/职业健康等)",
        department4:"认识类(考勤/社保/公积金/薪酬/培训等)",
        Idea:"Your Golden Idea",
        IdeaContent: " Problems/issues you find in current situation, and what can we do to improve/enhance"
    },
    like:{
        title:" Thumb Up for “Him/Her” ",
        content:' Employee who around you worth to be praised, please describe: ',
        name: "Name",
        nameContent:' His/Her name ',
        employee_ID: "Employee ID",
        employee_IDContent:"His/Her employee ID",
        department: " Department",
        departmentContent:"His/Her department",
        content:"Please describe in detail (at least 50 characters):  ",
        ps:"Remark：He/She will get bonus once be selected, and you can get a gift. "
    },
    help:{
        title:"Ask for Help",
        mobile: 'Mobile Phone',
        content: "Please describe the difficulties or obstacle you are facing",
        tabHelp:"Ask for help",
        tabMyhelp:"What I asked"
    },
    kqcx:{
        tabKqcx:"Attendance Records",
        tabAbnormal:"Abnormal records",
        kqycTitle:"Details of abnormal records",
        abnormalType:"abnormal type",
        int:"record",
        out:" record ",
        late: "Times of late",
        lateTime: "Late time (min)",
        leaveearly: "Times of leave early",
        leaveearlyTime: "Leave early time (min)",
        absenteeism: "Absent for work",
        absenteeismTime: "Absent time (hour)",
        workingHours:"Actual hours",
        attendanceTime:"Participation time(hour)",
        compassionateleave:"Compassionate Leave",
        sickLeave:"Sick Leave",
        injuryLeave:"Injury Leave",
        fullpay:"Full Pay",
        OT:"OT",
        date:"Date",
        title:" Attendance Inquiry ",
        selDay:'Period',
        threeDay:'Three days',
        sevenDay:'Seven days',
        oneMonth:'One month',
        twoMonth:'Two months',
        title2:'Attendance record, total ',
        title3:'items',
        content:" Please follow the policy of information secrecy, do not share this information to anyone."
    },
    certificate:{
        title:'Self-help Certificate',
        incomeCertificate:'Certificate of income',
        certificateOfEmployment:'On-the-job certificate',
        certificateOfTakingLeave:'Certification of Leave',
        reissueWorkingCard:'Reissue Working card',
        Reason:'Reason',
        Use:"purpose",
        Explain:'Explain',
        UseContent:"Purchase/purchase of car/credit card application/qualification examination/residence permit/business insurance declaration,etc."
    },
    GBSHR:{
        LTP:'LTP Password Reset',
        basicGuide:'Basic Guide',
        SocialInsurance:'Social Insurance',
        HousingFund: 'Housing Fund',
        EmployeeDismiss: 'Employee Dismission',
        DismissIntro: 'Dismission Introduce',
        DismissStatus: 'Dismission Status',
        DismissIntro_SOUTH: 'South Campus',
        DismissIntro_NORTH: 'North Campus',
        DismissIntro_FOREIGN: 'Foreigner',
        DismissLastDay: 'Last working day',
        DismissBeginDay: 'Dismiss begin day',
        Status: 'Status',
        NoStatus: 'Only dismissing employee has this status',
        Done: 'Done',
        Required: 'Required',
        LostFound: 'Lost & Found',
    },
    xfcx:{
        title:" Consume Inquiry ",
        selDay:'Period',
        threeDay:'Three days',
        sevenDay:'Seven days',
        oneMonth:'One month',
        twoMonth:'Two months',
        title2:'Consume record, total',
        title3:'items，your balance: ',
        title4:'RMB'
    },
    bus:{
        title:" Shuttle Bus Information",
        content:'GPS information of other shuttle bus will be added later',
        tabGps:'GPS of shuttle bus',
        tabBusTime:'Shuttle bus schedule'
    },
    rexian:{
        title:" Hotline ",
        button: 'Click to call'
    },
    gonggao:{
        title :"Announcement"
    },
    activity:{
        title :"Activities"
    },
    meal:{
        title :"Central Cafeteria Meal Order",
        tabMeal:"Meal order",
        tabMobile:"Mobile phone",
        restaurantPhone:"Phone number of canteen",
        tabMyMeal:"My order",
        MyMealTitle:"My order"
    },
    shareCar:{
        title:"Car Sharing",
        tabCar:"Car Sharing",
        tabMy:"Mine",
        button :'Publish',
        MylTitle:"My order",
        carer:"I'm car owner",
        passenger :"I'm passenger",
        mobile :"Mobile phone",
        carNo:'Plate number',
        startPoint:"Starting point",
        EndPoint :"Destination",
        midPoint:"Pass by",
        startTime:"Start time",
        endTime:'End time',
        seatCoun:"Number of seats",
        select :"Please select",
        Remarks :"Detail description",
        RemarksContent:"Remark"
    },
    survey:{
        title :"Survey"
    },
    handbook:{
        title :"Language"
    },
    apply:{
        title :"Sign Up"
    },
    insurance:{
        title:" Commercial Insurance "
    },
    register: {
        title:" Register ",
        mobile:"Mobile",
        btnVerificationCode: "Get the verification code",
        VerificationCode: "Verification code",
        ps: "If you can't receive the message, please check the security configuration in your phone.",
        btnSubmit: "Submit",
        passwordRemark: "Please key in your password: ",
        duplicatePassword: "Double confirm your password:"
    },
    forgetPassWord: {
        title:"Forget PassWord",
        title1:"Modify the password",
        mobile: "Registered mobile ",
        currentPassword:"Current password",
        newPassword:"New password",
        duplicatePassword:"Double confirm your password"
    },
    rebindPhone:{
        title:"Change Binding Mobile",
        newPhone:"new mobile number",
        errWorkdayNo:"WorkNo is required",
        errMobile:"Mobile is incorrect",
        errIdno:"IDNo is required",
        ExplainTxt:"For confirmed users who changed the mobile number"
    },
    CSER:{
        cserDate:"CSER Calendar",
        cserDatePrompt:"You can click on related topics to sign up",
        DateEnd:"End date",
        calender:"CSER Calendar",
        kidsCaring:"Kids Caring",
        sumwinCamp:"Summer/Winner Camp",
    },    
    activityGood:{
        title:"PCBA-B11第二届球类竞技赛冠军队有奖竞猜",
        name: "Name",
        employee_ID: "Employee ID",
        department: "Department",
        designer:"Author",
        desc:"Describe",
        designConcept: "Design Concept"
    },
    ehsAct:{
        title:"EHS online Activity"
    },
    admin:{
        bus:" Shuttle Bus Inquiry ",
        meal: "Meal Order",
        icCardLost:"Report loss of IC card",
        dorm:"Dormitory",
        promptTitle:"Prompt",
        promptOK:"OK",
        promptCancel:"Cancel",
        promptReportLost:"Are you sure to report you IC card lost?",
        lastRequest:"Last Request",
        submitSucc:'Your report loss was commited, thank you!',
        canteenMenu:'Cafeteria Menu',
    },
    dormManage:{
        housingAllowance:"Housing Allowance",
        checkInState:"Checked in",
        checkOutDate:"Check out date",
        hiredDate:"Hire date",
        allowanceSucc:"Housing Allowance apply success, effective date:",
        applyDorm:"Apply Dormitory",
        hasHousingAllowance:"Has Housing Allowance",
        requireType:"Check in type",
        requireReason:"Reason",
        chargingDefine:"Fee inquiry",
        dormArea:"Dormitory area",
        applyDormSucc:"Your required was submit",
        rcenetMonth:"Recent one month",
        noFeeRecord:"No Feed Record",
        dormMap:"Dormitory Map",
        dormNotice:"Dormitory Notices",
        dormNoticeProtocol:"Dormitory Protocol",
        repairDorm:"Repair",
        reissueKey:"Reissue key(s)",
        dormAddress:"Address",
        repairTime:"Depair time",
        deviceType:"Device type",
        repairDesc:"报修内容",
        keyType:"Key",
        repairDormSucc:"Your required was submit",
        reissueKeySucc:"Your required was submit",
        totalMoney:"Total",
        freeDormWifi:"Free Wifi",
        dormAskAndAns:"Dormitory FAQ",
        dormSuggest:"Suggestion",
        yourSuggest:"Your suggestion",
        hisSuggest:"History",
        suggestSucc:"Thanks for you suggestion!",
        respSuggest:"Reply",
    },
    union:{
        communicate:"Hotlines",
        welfare:"Welfare",
        activity:"Activities",
        helpSupport:"Help Support",
        wonderfulMoment:"Wonderful Moments",
        suggest:"Suggestion",
        hotline:"Hotlines",
        otherCommunMethod:"Othe Communications",
        welfare_fest:"Festival Welfare",
        welfare_union:"Union Welfare",
        welfare_dmUnion:"Doumen Union Welfare",
        welfare_notice:"Welfare Notices",
        welfare_applyResult:"Welfare Application Result",
        welfare_old:"Past Union Welfare",
        AttendAct:"Volunteer registration",
        ActTime:"Time",
        ActVenue:"Location",
        ActDateBegin:"Begin",
        ActDateEnd:"End",
        mySuggest:"My suggestion",
        openSuggest:"They said",
        carTicket:"Car Tickets",
    },
    mechCharity:{
        introduce:"Introduction",
        activity:"Activities",
        wonderfulMoment:"Past Activities",
        accountingPublic:"Accounting Public",
        research:"Research",
        arch:"Organizational structure",
        projArch:"Project system",
        AttendAct:"Volunteer registration",
        manageEmail:"Immediate Supervisor E-Mail",
        favourite:"Hobbies",
        pastActivities:"Types of volunteer activities in the past",
        freeTime:"Attendance time",
        moneyPublic:"Donation public",
        materialPublic:"Materials donation public",
        yearAccountingPublic:"Annual accounting report",
        donation:"Donation(Yuan)",
        donationMaterial:"Material Donation",
        infoSelectMon:"Please choose month!",
        infoSelectYear:"Please choose Year!"
    },
    lostFound:{
        tabMy:"My public",
        public:"publish",
        lost:"Lost something",
        found:"Found",
        lostFoundPublic:"Find Owner",
        msgPublicSuccess:"Public ok!",
        closePublic:"Cancel Public",
        relatePhoto:"Relate photos",
        Publisher:"Publisher",
        PublishTime:"Publish Time",
        goodName:"Name",
        curLoc:"Temporary keep place",
        phone:"Contact Number",
    },
    eAdmin:{
        RequisitionFormInfo:'Information Of Requisition Form',
        Company:'Company',
        Segment:'Segment',
        Department:'Department',
        Project:'Project',
        DeptApprover:'Dept approver',
        CostCenter:'Cost Center',
        OccupantInfo:'Occupant\'s information',
        Name:'Name',
        Gender:'Gender',
        Nationality:'Nationality',
        EmployeeID:'Employee ID',
        Level:'Level',
        EmailAddress:'Email',
        CheckinTime:'Check in time',
        CheckoutTime:'Check out time',
        TelNo:'Tel. No',
        TypeOfApply:'Type of apply',
        TypeOfRoom:'Type of room',
        WithFamilyMembers:'With family members or not',
        WithHousingSubsidy:'With housing subsidy or not',
        FamilyMemberInfo:'Family member\'s Info',
        AgreeFamilyRegulations:'Agree Family Regulations',
        ContactPerson:'Contact Person',
        ContactEmployeeID:'Contact Employee ID',
        ContactNo:'Contact No.',
        Remark:'Remark',
        Applicant:'Applicant',
        SubmitDate:'Submit Date',
        FilledbyCampusAdministration:'Filled by Campus Administration',
        DormArea:'Dorm Area',
        RoomNo:'Room No',
        ApprovalRecord:'Approval record',
        ApprovalAction:'Approval action',
        Approver:'Approver',
        ApproveStatus:'Approve status',
        Action:'Action',
        ApprovedTime:'Approved at',    
        Approve:'Approve',
        Reject:'Reject',
        RasierName:'Rasier name',
        ApplyReason:'Apply reason',
        CostChangeTo:'Cost change to',
        TotalCost:'total cost',
        FromCompany:'from company',
        JoinDate:'join date',
        Mobile:'mobile',
        JobGrade:'job grade',
        LiveInDorm:'Is accommodation',
        FilledbyDormGroup:'Filled by Dorm group',
        SubsidyEffDate:'Subsidy effective date',
    }
};

var ERROR = {
    WRONG_ACCESSTOKEN: 'wrong accessToken',
    IS_NOT_EXISTS: 'is not exists',
    TIME_OUT: 120000
};


String.prototype.formatParam = function(){
    var string = this + '';
    for ( var i = 0 ; i < arguments.length ; i++ ) {
        string = string.replace(/{(:\w+)}/, arguments[i]);
    }
    return string;
};

var GLOBAL_INFO = {
    LAST_PUBLISH_DATE: "2019-02-11",
    //keys
    KEY_ACT_GOOD_ID: "KEY_ActivityGood",
    KEY_ACT_GOOD_ITEMID: "KEY_ActivityGood_ITEMID",
    KEY_DORM_NOTICE_ID: "KEY_DORM_NOTICE_ID",
    KEY_ASK_AND_ANS_ID: "KEY_ASK_AND_ANS_ID",
    KEY_DYNPAGE: "KEY_DYNPAGE",
    KEY_UNION_WONDERFULMON_ID: "KEY_UNION_WONDERFULMON_ID",
    KEY_UNION_SUGGOPEN_ID: "KEY_UNION_SUGGOPEN_ID",
    KEY_MC_RESEARCH_ID: "KEY_MC_RESEARCH_ID",
    KEY_MC_RESEARCH_TITLE:"KEY_MC_RESEARCH_TITLE",
    KEY_MC_WONDERFULMON_ID: "KEY_MC_WONDERFULMON_ID",
    KEY_LOSTFOUND_ID: "KEY_LOSTFOUND_ID",
    KEY_EADMIN_DORMAPP_TYPE: "KEY_EADMIN_DORMAPP_TYPE",
    KEY_EADMIN_DORM: "KEY_EADMIN_DORM",
};
