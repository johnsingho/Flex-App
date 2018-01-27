/**
 * 默认程序设置 会被写如localStorage
 */

//本机开发
//var API_HOST = 'http://localhost:64511';

//正式环境
var API_HOST = 'https://zhmobile.flextronics.com/EvaluationApp';

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
    menu: {
        menu: "菜单",
        home: "首页",
        about: "积分宗旨",
        changepassword: "修改密码",
        signout: "注销",
        signin: "注销",
        quit: "退出"
    },
    tab:{
        home:"首页",
        rules:"评分细则",
        points:"评分信息",
        ranking:"积分排名",
        user:"用户中心"
    },
    home: {
        pointsinfo: " 您好！欢迎使用本调查系统",
        describe: "感谢使用员工评分调查系统，员工对评分项目进行打分或选择，系统定期评分并奖励，敬请关注！",
        thisTime: "本次评分",
        last: "上次评分",
        monthlyTimes: "月评次数",
        monthlySum: "月总积分",
        yearTimes: "年评次数",
        yearSum: "年总积分"
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
    },
    signin: {
        username: "工号WorkdayId",
        password: "密码",
        title : "珠海园区员工自评系统"
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
        username: "工号Workday Id",
        password: "身份证后四位",
        title: "员工评分系统"
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