/**
 * 默认程序设置 会被写如localStorage
 */

 //开关
 //是否本地开发调试
 var IsDebugMode = false; //false;

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

function isChineseLang(vRootScope){
    return vRootScope.Language==ZH_CN;
}
function isEmptyString(str){
    return !str || 0==str.length;
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

    getActivityGoods: API_HOST + '/EvaluationAppService.ashx?action=getActivityGoods',
    addActivityGoods: API_HOST + '/EvaluationAppService.ashx?action=addActivityGoods',

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
        reason:"原因",
        grade:"薪资级别",
        yuan:"元",
        InfoProvideIDNO:"请提供身份证号码!",
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
        dormManage:"宿舍管理"
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
        HousingFund:'住房公积金信息',
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
        title:"CSER日历",
        title2:"可点击相关主题进行报名",
        DateEnd:"结束日期"
    },
    activityGood:{
        title:"手语海报设计大赛",
        name:"作品名",
        employee_ID:"工号",
        department:"部门",
        designer:"设计者",
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
        submitSucc:'您的挂失申请已提交，正在等待一卡通后台处理，谢谢！'
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
        repairDorm:"宿舍报修",
        reissueKey:"补办钥匙",
        dormAddress:"宿舍地址",
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
    }
};

var ZH_US = {
    common:{
        memo:"memo",
        Explain:"explain",
        grade:"grade",
        yuan:"RMB",
        InfoProvideIDNO:"The IDNO is required!",
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
        GBS:'GBS HR',
        admin:"Admin",
        earthday:"Earth Week",
        dormManage:"Dormitory Management"
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
        HousingFund:'Housing Fund',
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
        title:"CSER Calendar",
        title2:"You can click on related topics to sign up",
        DateEnd:"End date"
    },
    activityGood:{
        title:" Sign Language Culture Poster Design Competition",
        name: "Title",
        employee_ID: "Employee ID",
        department: "Department",
        designer:"Designer",
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
        submitSucc:'Your report loss was commited, thank you!'
    },
    dormManage:{
        housingAllowance:"Housing Allowance",
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
    LAST_PUBLISH_DATE: "2018-08-01",
    //keys
    KEY_DORM_NOTICE_ID: "KEY_DORM_NOTICE_ID",
    KEY_ASK_AND_ANS_ID: "KEY_ASK_AND_ANS_ID",
};
