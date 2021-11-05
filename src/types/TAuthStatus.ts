import IDataStatus from 'types/IDataStatus';
import TNullable from 'types/TNullable';

interface IAuthStatus extends IDataStatus {
    isLoggedIn: boolean;
    serviceId?: TNullable<string>;
}

type TAuthStatus = IAuthStatus;

export default TAuthStatus;
