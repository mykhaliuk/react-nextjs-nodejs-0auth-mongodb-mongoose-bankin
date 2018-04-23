import React               from 'react'
// import * as Ico from 'mdi-material-ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library }         from '@fortawesome/fontawesome-svg-core/index'
import * as i              from '@fortawesome/free-solid-svg-icons/index'

export const getIcon = ( {icon} ) => {
  return <FontAwesomeIcon icon={`${icon}`} fixedWidth style={{marginLeft: 6, marginTop: 4}} />
  // return Ico[icon]()

}

export const InitFontAwesome = () => {
  console.log( 'Init font' )
  Object.keys( i ).forEach( key => {
    if (key.startsWith( 'fa' ) && ( key.length > 3 )) library.add( i[ key ] )
  } )

  /*//Adding manually
  library.add(
    i.faSignInAlt,
    i.faCoffee,
    i.faShoppingBasket,
    i.faGamepad,
    i.faRocket,
    i.faUtensils,
    i.faLemon,
    i.faPoo,
    i.faBeer,
    i.faGlassMartini,
    i.faWineGlass,
    i.faCameraRetro,
    i.faAt,
    i.faGolfBall,
    i.faVolleyballBall,
    i.faCouch,
    i.faPaw,
    i.faSuitcase,
    i.faSnowflake,
    i.faWifi,
    i.faSyncAlt,
    i.faHandHoldingHeart,
    i.faMobileAlt,
    i.faMoneyBillAlt,
    i.faMedkit,
    i.faPiggyBank,
    i.faNotesMedical,
    i.faUserMd,
    i.faWrench,
    i.faUniversity,
    i.faFire,
    i.faCreditCard,
    i.faPercent,
    i.faUsers,
    i.faCapsules,
    i.faCar,
    i.faShieldAlt,
    i.faBirthdayCake,
    i.faBus,
    i.faExchangeAlt,
    i.faEye,
    i.faFlagCheckered,
    i.faHeartbeat,
    i.faTaxi,
    i.faWarehouse,
    i.faRoad,
    i.faPlane,
    i.faTrain,
    i.faBed
  )*/
}

export default getIcon