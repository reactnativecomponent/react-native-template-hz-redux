import * as utilsActions from '../actions/utils';
import * as userActions from '../actions/user';

export default function utilsMiddleware({dispatch}) {
	return next => action => {
		const {payload, error, meta={}} = action;

		const dispatchToast = (...args)=> {
			dispatch(utilsActions.toast(...args));
		};
		const dispatchInvalidToken = ()=> {
			dispatch(utilsActions.invalidToken());
		};
		const dispatchLoginOut = ()=> {
			dispatch(userActions.logout());
		};
		// error handle
		if (error) {
			if(payload.type === 'http'){
				dispatchToast(`网络连接错误【${payload.res.status}】`);
			}else if(payload.type === 'token' || payload.code === '301' || payload.code === '302'){
				dispatchToast(payload.msg || payload.message);
				dispatchInvalidToken();
				dispatchLoginOut();
			}else{
				dispatchToast(payload.msg || "请检查网络是否连接");
			}
		}
		next(action);
	}
}
