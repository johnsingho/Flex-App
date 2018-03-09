/**
 * 默认程序设置 会被写如localStorage
 */

//本机开发
var API_HOST = 'http://localhost:64511';

//正式环境
//var API_HOST = 'https://zhmobile.flextronics.com/EvaluationApp';

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

    RestPassword: API_HOST + '/AccountService.ashx?action=RestPassword'



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
    signin: {
        username: "工号",
        password: "密码",
        register : "注册",
        forgetPassword: "修改密码"
    },
    tab:{
        home:"首页",
        myMsg:"我的消息",
        myFlex:"我的Flex+"
    },
    home: {
        home:"首页",
        evaluation:"自 评",
        goldenidea:"金点子",
        like:"为TA点赞",
        help:"我要求助",
        kqcx:"考勤查询",
        xfcx:"消费查询",
        banchexx:"班车信息",
        rexian:"热线电话",
        zhaoping:"内部招聘",
        gonggao:"通知公告",
        activity:"活 动",
        meal:"订 餐"
    },
    points:{
        title: "评分记录",
        evaluateName: "评分项目",
        score: "分数",
        time: "时间",
        reason: '加分项，填写您觉得做的好的事情（这是实名制提交）',
        reasonGlodIdea: '加分项，填写您的宝贵建议，可能会收获惊喜（这是实名制提交）'
    },
    ranking: {
        building: "厂",
        dept: "部门",
        section: "工序",
        workdayNo: "工号",
        cName: "姓名",
        avgScore: "平均分",
        sumScore: "总积分",
        times: "次数"
    },
    usercenter: {
        userinfo: "用户信息",
        building: "厂",
        dept: "部门",
        section: "工序",
        titleCode: "用户类型",
        totalpoints: "总积分",
        rankinginfo: "积分排名信息",
        type: "排名类型",
        daily: "日排名",
        weekly: "周排名",
        monthly: "月排名",
        quarterly: "季排名",
        yearly: "总排名"
    }

};

var ZH_US = {
    menu: {
        menu: "Menu",
        home: "Home",
        about: "Points Mission",
        changepassword: "Change Password",
        signout: "Sign Out",
        signin: "Sign In",
        quit: "Quit"
    },
    tab: {
        home: "Home",
        rules: "Rules",
        points: "Points",
        ranking: "Ranking",
        user: "User Center"
    },
    home: {
        pointsinfo: "Points Info",
        thisTime: "Daily",
        Last: "Weekly",
        monthly: "Monthly",
        totalpoints: "Total",
        addtask: "Actual/Target Monthly Adding",
        subtask: "Actual/Target Monthly Subtracting"
    },
    points: {
        title: "Evaluate Records",
        evaluateName: "EvaluateName",
        score: "Score",
        time: "Time"
    },
    ranking: {
        building: "Building",
        dept: "Detp",
        section: "Section",
        workdayNo: "User",
        cName: "TotalPoints",
        avgScore: "SubPoints",
        sumScore: "Ranking"
    },
    usercenter: {
        userinfo: "User Info",
        building: "Building",
        dept: "Department",
        section: "Section",
        titleCode: "User ",
        totalpoints: "Total Points",
        rankinginfo: "Points Info",
        type: "Type",
        daily: "Daily",
        weekly: "Weekly",
        monthly: "Monthly",
        quarterly: "Quarterly",
        yearly: "Yearly"
    },
    signin: {
        username: "WorkdayId",
        password: "password",
        register : "Register",
        forgetPassword: "ForgetPassword"
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