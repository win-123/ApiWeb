import axios from 'axios'
import store from '../store/state'
import router from '../router'
import {Message} from 'element-ui'

if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = '/api'
} else if (process.env.NODE_ENV == 'debug') {
    axios.defaults.baseURL = '/api'
} else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = '/api'
}


axios.defaults.withCredentials = true;
// axios.defaults.baseURL = '/api'

// 请求超时时间
axios.defaults.timeout = 10000;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use(
    config => {
        if (config.url.indexOf("/project/?cursor=") !== -1) {
        }
        else if (!config.url.startsWith("/user/")) {
            config.url = config.url + "?token=" + window.localStorage.getItem("token");
        }
        return config;
    }, error => {
        return Promise.reject(error);
    });

// 响应拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        try {
            if (error.response.status === 401) {
                router.replace({
                    name: 'Login'
                })
            }

            if (error.response.status === 500) {
                Message.error({
                    message: '服务器内部异常, 请检查',
                    duration: 1000
                })
            }
        }
        catch (e) {
            Message.error({
                message: '服务器连接超时，请重试',
                duration: 1000
            })
        }
    });

// 用户注册登录相关URL配置

export const register = params => {
    return axios.post('/user/register/', params).then(res => res.data)
}; // 注册

export const login = params => {
    return axios.post('/user/login/', params).then(res => res.data)
};  // 登录


// 项目中用户行为相关配置

export const getProjectList = params => {
    return axios.get('/project/', params).then(res => res.data)
};  // 获取项目列表

export const addProject = params => {
    return axios.post('/project/', params).then(res => res.data)
};  // 添加项目

export const deleteProject = params => {
    return axios.delete('/project/', params).then(res => res.data)
}; // 删除项目

export const updateProject = params => {
    return axios.patch('/project/', params, false).then(res => res.data)
};  //  更新项目


export const getProjectDetail = params => {
    return axios.get('/pro_detail/', params).then(res => res.data)
};  // 获取项目详情

// export const getPagination = url => {
//     return axios.get(url).then(res => res.data)
// };  // 分页


// debug 操作
export const getDebugtalk = params => {
    return axios.get('/debugtalk/', params).then(res => res.data)
};

export const updateDebugtalk = params => {
    return axios.patch('/debugtalk/', params).then(res => res.data)
};

// 该接口未调
export const runDebugtalk = params => {
    return axios.post('/debugtalk/', params).then(res => res.data)
};

//  树形结构
export const getTree = params => {
    return axios.get('/tree/', params).then(res => res.data)
};

export const updateTree = params => {
    return axios.patch('/tree/', params).then(res => res.data)
};

//  文件上传
export const uploadFile = url => {
    return axios.defaults.baseURL + '/file/?token=' + store.token
};


// API相关操作
export const addAPI = params => {
    return axios.post('/api/', params).then(res => res.data)
};

export const updateAPI = params => {
    return axios.patch('/api/', params).then(res => res.data)
};

export const apiList = params => {
    return axios.get('/api/', params).then(res => res.data)
};

export const delAPI = params => {
    return axios.delete('/api/', params).then(res => res.data)
};

export const copyAPI = params => {
    return axios.post('/api/', params).then(res => res.data)
};

export const delAllAPI = params => {
    return axios.delete('/api/', params).then(res => res.data)
};

export const getAPISingle = params => {
    return axios.get('/api/', params).then(res => res.data)
};

// 分页获取
export const getPaginationBypage = params => {
    return axios.get('/api/', params).then(res => res.data)
};

// 测试套件
export const addTestCase = params => {
    return axios.post('/test/', params).then(res => res.data)
};

export const updateTestCase = params => {
    return axios.patch('/test/', params).then(res => res.data)
};


// 测试用例
export const testList = params => {
    return axios.get('/case/', params).then(res => res.data)
};

export const deleteTest = params => {
    return axios.delete('/case/', params).then(res => res.data)
};

export const delAllTest = params => {
    return axios.delete('/case/', params).then(res => res.data)
};

export const copyTest = params => {
    return axios.post('/case/', params).then(res => res.data)
};


export const editTest = params => {
    return axios.get('/case_step/', params).then(res => res.data)
};

export const getTestPaginationBypage = params => {
    return axios.get('/case/', params).then(res => res.data)
};


// 配置管理
export const addConfig = params => {
    return axios.post('/config/', params).then(res => res.data)
};

export const updateConfig = params => {
    return axios.patch('/config/', params).then(res => res.data)
};


export const configList = params => {
    return axios.get('/config/', params).then(res => res.data)
};

export const copyConfig = params => {
    return axios.post('/config/', params).then(res => res.data)
};

export const deleteConfig = params => {
    return axios.delete('/config/', params).then(res => res.data)
};

export const delAllConfig = params => {
    return axios.delete('/config/', params).then(res => res.data)
};

export const getConfigPaginationBypage = params => {
    return axios.get('/config/', params).then(res => res.data)
};

export const getAllConfig = params => {
    return axios.get('/config/', params).then(res => res.data)
};


// API执行操作
export const runSingleAPI = params => {
    return axios.post('/run_api/', params).then(res => res.data)
};

export const runAPIByPk = params => {
    return axios.get('/run_api_pk/', params).then(res => res.data)
};

export const runAPITree = params => {
    return axios.post('/run_api_tree/', params).then(res => res.data)
};


// 测试套件执行
export const runSingleTestSuite = params => {
    return axios.post('/run_testsuite/', params).then(res => res.data)
};

export const runSingleTest = params => {
    return axios.post('/run_test/', params).then(res => res.data)
};

export const runTestByPk = params => {
    return axios.get('/run_testsuite_pk/', params).then(res => res.data)
};

export const runSuiteTree = params => {
    return axios.post('/run_suite_tree/', params).then(res => res.data)
};

// 变量配置
export const addVariables = params => {
    return axios.post('/variables/', params).then(res => res.data)
};

export const variablesList = params => {
    return axios.get('/variables/', params).then(res => res.data)
};

export const getVariablesPaginationBypage = params => {
    return axios.get('/variables/', params).then(res => res.data)
};


export const updateVariables = params => {
    return axios.patch('/variables/', params).then(res => res.data)
};

export const deleteVariables = params => {
    return axios.delete('/variables/', params).then(res => res.data)
};

export const delAllVariabels = params => {
    return axios.delete('/variables/', params).then(res => res.data)
};

// 报告配置
export const reportList = params => {
    return axios.get('/reports/', params).then(res => res.data)
};

export const deleteReports = params => {
    return axios.delete('/reports/', params).then(res => res.data)
};

export const getReportsPaginationBypage = params => {
    return axios.get('/reports/', params).then(res => res.data)
};

export const delAllReports = params => {
    return axios.delete('/reports/', params).then(res => res.data)
};

export const watchSingleReports = params => {
    return axios.get('/reports/', params).then(res => res.data)
};

//  任务配置
export const addTask = params => {
    return axios.post('/schedule/', params).then(res => res.data)
};

export const taskList = params => {
    return axios.get('/schedule/', params).then(res => res.data)
};

export const getTaskPaginationBypage = params => {
    return axios.get('/schedule/', params).then(res => res.data)
};

export const deleteTasks = params => {
    return axios.delete('/schedule/', params).then(res => res.data)
};


//  主机配置
export const addHostIP = params => {
    return axios.post('/host_ip/', params).then(res => res.data)
};

export const hostList = params => {
    return axios.get('/host_ip/', params).then(res => res.data)
};

export const updateHost = params => {
    return axios.patch('/host_ip/', params, false).then(res => res.data)
};

export const deleteHost = params => {
    return axios.delete('/host_ip/', params).then(res => res.data)
};

export const getHostPaginationBypage = params => {
    return axios.get('/host_ip/', params).then(res => res.data)
};

export const getAllHost = params => {
    return axios.get('/host_ip/', params).then(res => res.data)
};
