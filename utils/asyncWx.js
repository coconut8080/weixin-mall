/** 
 * promise 形式 的 getSetting
 */
export const getSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx.getSetting({
            success: (result) => {
                resolve(result);
                
            },
            fail: (err) => {
                reject(err);
                
            }
        });   
    })
}
/** 
 * promise 形式 的 chooseAddress
 */
export const chooseAddress=()=>{
    return new Promise((resolve,reject)=>{
        wx.chooseAddress({
            success: (result) => {
                resolve(result);
                
            },
            fail: (err) => {
                reject(err);
                
            }
        });   
    })
}
/** 
 * promise 形式 的 openSetting
 */
export const openSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx.openSetting({
            success: (result) => {
                resolve(result);
                
            },
            fail: (err) => {
                reject(err);
                
            }
        });   
    })
}

/**
 * promise 形式 的 showModal
 *  @param {object} param0 参数
 */
export const showModal=({content})=>{
    return new Promise((resolve,reject)=>{
        wx.showModal({
            title: '提示',
            content: content,
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            }
        });
            
    })
}

/**
 * promise 形式 的 showToast
 *  @param {object} param0 参数
 */
export const showToast=({title})=>{
    return new Promise((resolve,reject)=>{
        wx.showToast({
            title: title,
            icon: 'none',
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            }
        });
            
    })
}