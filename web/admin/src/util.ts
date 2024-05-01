
import moment from 'moment';

export function dateFormat(dt?: any, foramt?: any) {
    if (!dt) return '-';
    return foramt ? moment(dt).format(foramt) : moment(dt).format('YYYY-MM-DD HH:mm');
}

export function dateTimestamp(dt?: any) {
    var format = 'YYYYMMDDHHmmss';
    return !dt ? moment(new Date()).format(format) : moment(dt).format(format);
}