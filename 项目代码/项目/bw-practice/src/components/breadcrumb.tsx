import { Breadcrumb } from 'antd';
import { Link, useLocation ,useIntl} from 'umi';

interface IBreadcrumbItem{
    path: string;
    breadcrumbName: string;
}
const BreadCrumbs: React.FC = ()=>{
    const location = useLocation();
    const intl = useIntl();
    const routes:IBreadcrumbItem[] = location.pathname.split('/').filter(item=>item).map(item=>{
        return {
            path: `/${item}`,
            breadcrumbName: item
        }
    })
    console.log('location', location, routes);
    function itemRender(route: IBreadcrumbItem, params: {}, routes: IBreadcrumbItem[], paths: string[]) {
        const last = routes.indexOf(route) === 0;
        console.log(routes);
        return last ? (
          <span>{intl.formatMessage({id: 'breadcrumb.'+ routes[0].breadcrumbName+'/'+routes[1].breadcrumbName})}</span>
        ) : (
          <Link to={paths.splice(1).join('/')}>{intl.formatMessage({id: 'breadcrumb.'+route.breadcrumbName})}</Link>
        );
      }
    return <Breadcrumb className='aa' itemRender={itemRender} routes={routes} />;
}

export default BreadCrumbs;