import React, { useEffect } from 'react';
import { Container, Grid, makeStyles, useMediaQuery } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useLocation } from 'react-use';
import { useDispatch, useSelector } from 'react-redux';
import FullWidthTabs from '../components/FullWidthTabs';
import { MENUS } from '../core/utils/consts';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import Content from '../components/Content';
import { setItem, setTab, setHome } from '../features/page';
import BgLogo from '../assets/bg_logo.png';


const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    // flexGrow: 1,
    '& .MuiContainer-root': {
      paddingLeft: 0,
      paddingRight: 0,
    }
  },

  bg: {
    width: '100vw',
    height: '100vh',
    position: 'relative',
    background: `url(${BgLogo})`,
    backgroundPositionX: '90%',
    backgroundPositionY: '16%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
    animation: 'ease 1s ease-in-out 1s',
    '&::before': {
      content: "''",
      position: 'absolute',
      display: 'block',
      backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg width='2783' height='2774' viewBox='0 0 2783 2774' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M2100.5 339C1559.5 -35.5015 901 114.001 545.566 452.557L463.834 364.695C942 -75.9993 1678.5 -118 2174.5 245L2164 254L2152.5 264.5L2142.5 275.5L2133 287L2123.5 299L2115 312L2107.5 325.5L2100.5 339ZM463.332 534.838C43.9569 964.792 9.50006 1610.5 359.5 2084.5L347 2090.5L332.5 2098L320 2106L307.5 2114.5L295.5 2123.5L284 2133.5L273.5 2144L263.5 2154.5C-126 1626 -79.0001 924.001 377.429 451.049L463.332 534.838ZM2304.58 2259.21C2729 1841 2772 1177 2451.5 688.501L2464.5 682L2477 674.5L2489.5 666.5L2501 657.501L2512.5 648L2524 637.5L2535 626L2545 614C2901 1134 2862.34 1883.57 2388.29 2345.19L2304.58 2259.21ZM702 2435C1129.5 2759 1821 2728 2256.24 2324.55L2336.73 2413.54C1858.41 2846.19 1114 2893 629 2530.5L640.5 2520.5L651.5 2510L661.5 2499L671 2487L682.5 2471L693 2454L702 2435Z' stroke='${theme.palette.text.secondary}' stroke-width='0.5'/%3e%3cpath d='M462.542 2470.63C541.932 2470.63 606.29 2406.28 606.29 2326.89C606.29 2247.5 541.932 2183.14 462.542 2183.14C383.153 2183.14 318.795 2247.5 318.795 2326.89C318.795 2406.28 383.153 2470.63 462.542 2470.63ZM725.79 2326.89C725.79 2472.27 607.93 2590.13 462.542 2590.13C317.155 2590.13 199.295 2472.27 199.295 2326.89C199.295 2181.5 317.155 2063.64 462.542 2063.64C607.93 2063.64 725.79 2181.5 725.79 2326.89Z' stroke='${theme.palette.text.secondary}' stroke-width='0.5'/%3e%3cpath d='M2338.64 594.533C2418.03 594.533 2482.39 530.175 2482.39 450.785C2482.39 371.396 2418.03 307.038 2338.64 307.038C2259.25 307.038 2194.9 371.396 2194.9 450.785C2194.9 530.175 2259.25 594.533 2338.64 594.533ZM2601.89 450.785C2601.89 596.173 2484.03 714.033 2338.64 714.033C2193.26 714.033 2075.4 596.173 2075.4 450.785C2075.4 305.398 2193.26 187.538 2338.64 187.538C2484.03 187.538 2601.89 305.398 2601.89 450.785Z' stroke='${theme.palette.text.secondary}' stroke-width='0.5'/%3e%3cpath d='M1944.58 888.379C2020.72 888.379 2084.91 903.873 2137.14 934.86C2189.38 965.847 2233.65 1010.11 2269.94 1067.66C2280.57 1084.48 2285.88 1100.42 2285.88 1115.47C2285.88 1134.95 2277.03 1150.89 2259.32 1163.28C2249.58 1169.48 2238.07 1172.58 2224.79 1172.58C2211.51 1172.58 2199.12 1169.48 2187.61 1163.28C2176.1 1156.2 2167.24 1146.9 2161.05 1135.39C2137.14 1095.55 2107.04 1065.45 2070.74 1045.09C2035.33 1023.84 1990.17 1013.21 1935.28 1013.21C1867.99 1013.21 1813.55 1026.49 1771.93 1053.05C1730.32 1078.73 1709.52 1116.36 1709.52 1165.94C1709.52 1211.98 1728.11 1250.49 1765.29 1281.48C1802.48 1312.46 1868.88 1332.83 1964.5 1342.56C2070.74 1353.19 2153.08 1385.5 2211.51 1439.51C2269.94 1492.63 2299.16 1563.02 2299.16 1650.67C2299.16 1714.41 2281.9 1769.3 2247.37 1815.34C2212.84 1860.5 2166.8 1894.58 2109.25 1917.6C2052.59 1939.74 1991.5 1950.8 1925.99 1950.8C1840.11 1950.8 1761.75 1931.32 1690.92 1892.37C1620.98 1853.41 1572.73 1802.51 1546.17 1739.65C1541.74 1729.02 1539.53 1720.17 1539.53 1713.08C1539.53 1699.8 1544.4 1688.29 1554.14 1678.56C1563.88 1667.93 1577.16 1660.85 1593.98 1657.31C1596.63 1656.42 1601.06 1655.98 1607.26 1655.98C1621.42 1655.98 1634.7 1660.41 1647.1 1669.26C1660.38 1677.23 1670.12 1688.29 1676.32 1702.46C1692.25 1736.99 1723.68 1766.21 1770.61 1790.11C1817.53 1814.01 1869.32 1825.97 1925.99 1825.97C1992.39 1825.97 2048.61 1810.92 2094.64 1780.81C2140.68 1749.83 2163.7 1707.77 2163.7 1654.65C2163.7 1604.19 2144.22 1561.25 2105.27 1525.83C2066.31 1489.53 2006.99 1467.4 1927.31 1459.43C1817.53 1448.81 1731.21 1416.93 1668.35 1363.81C1605.49 1309.81 1574.06 1242.52 1574.06 1161.95C1574.06 1105.29 1589.99 1056.6 1621.87 1015.87C1654.62 974.258 1698.89 942.828 1754.67 921.58C1811.33 899.446 1874.63 888.379 1944.58 888.379Z' stroke='${theme.palette.text.secondary}' stroke-width='0.5' stroke-linecap='square'/%3e%3cpath d='M542.643 969.389C542.643 949.026 549.283 932.647 562.563 920.252C575.844 906.971 592.223 900.331 611.701 900.331C632.064 900.331 648.443 906.971 660.838 920.252C674.118 932.647 680.758 949.026 680.758 969.389V1589.58C680.758 1636.5 693.153 1678.56 717.943 1715.74C743.618 1752.93 778.589 1782.14 822.857 1803.39C868.01 1823.75 919.361 1833.94 976.908 1833.94C1031.8 1833.94 1080.94 1823.75 1124.32 1803.39C1167.7 1782.14 1201.35 1752.93 1225.25 1715.74C1250.04 1678.56 1262.43 1636.5 1262.43 1589.58V969.389C1262.43 949.026 1269.07 932.647 1282.35 920.252C1295.64 906.971 1312.01 900.331 1331.49 900.331C1350.97 900.331 1366.91 906.971 1379.3 920.252C1392.58 932.647 1399.22 949.026 1399.22 969.389V1589.58C1399.22 1660.41 1381.07 1724.15 1344.77 1780.81C1309.36 1836.59 1259.34 1880.42 1194.71 1912.29C1130.96 1943.28 1058.36 1958.77 976.908 1958.77C892.8 1958.77 817.545 1943.28 751.144 1912.29C685.627 1880.42 634.277 1836.59 597.092 1780.81C560.793 1725.04 542.643 1661.29 542.643 1589.58V969.389Z' stroke='${theme.palette.text.secondary}' stroke-width='0.5' stroke-linecap='square'/%3e%3c/svg%3e ")`,
      backgroundPositionX: '85%',
      backgroundPositionY: '34%',
      backgroundSize: '400% 400%',
      opacity: 0.5,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
    },
    '&::after': {
      content: "''",
      position: 'absolute',
      display: 'block',
      background: `linear-gradient(-45deg, ${`${theme.palette.background.default}f2 0%, ${theme.palette.background.default}4d 40%, ${theme.palette.background.default}1a 50%, ${theme.palette.background.default}4d 60%, ${theme.palette.background.default}f2 100%`})`,
      animation: 'gradient 7s ease infinite',
      backgroundSize: '400% 400%',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
    },
  },

  logo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    // margin: theme.spacing(1),
    '&>img': {
      '@media (min-width: 600px)': {
        margin: theme.spacing(2),
        height: '5rem',
        width: 'auto',
      },
      '@media (max-width: 600px)': {
        margin: theme.spacing(1),
        height: '3.2rem',
        width: 'auto',
      }
    },
    '& .MuiTypography-h3': {
      margin: theme.spacing(1),
      '@media (max-width: 600px)': {
        marginBottom: theme.spacing(1),
        fontSize: '20px',
      }
    }
  },
  menutab: {
    background: `${theme.palette.grey['900']}`,
    boxShadow: `${theme.shadows[5]}`,
    '& .MuiPaper-elevation4': {
      boxShadow: 'none',
    },
    '& .MuiTab-wrapper': {
      '@media (max-width: 600px)': {
        lineHeight: 1.25,
      }
    }
  },
  subheader: {
    margin: `${theme.spacing(2)}px ${theme.spacing(4)}px`,
    color: theme.palette.text.secondary,
    '@media (max-width: 600px)': {
      margin: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
      fontSize: '16px',
    }
  },
  list: {
    '& .MuiGrid-item': {
      width: '100%',
    },
    '& .MuiGrid-grid-xs-12': {
      maxWidth: 250,
    },
    // borderRight: `1px solid ${theme.palette.divider}`,
    '& .MuiList-padding': {
      padding: 0,
    },
    '& .MuiListItem-button': {
      '&:hover': {
        backgroundColor: 'rgba(8, 131, 189, .3)'
      }
    },
    '& .MuiListItem-root.Mui-selected': {
      '&:hover': {
        backgroundColor: 'rgba(8, 131, 189, .5)'
      },
      backgroundColor: 'rgba(8, 131, 189, .5)'
    }
  },
  content: {
    padding: theme.spacing(2),
    width: '100%',
    '& .MuiTypography-subtitle2': {
      color: theme.palette.secondary.light,
    }
  }
}));

const Main = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.page);
  const { tab, item, home } = selector;
  const { pathname } = useLocation();
  const smMatches = useMediaQuery('(min-width:600px)');

  const handleTabChange = (v) => {
    dispatch(setTab({tab: v}));
    if(v > -1) {
      history.push(`/${MENUS[v].value}`);
    }
  };

  const handleListItemClick = (v) => {
    dispatch(setItem(v));
  };

  useEffect(() => {
    const tabItemIndex = MENUS.findIndex(({ value }) => pathname === `/${value}`);
    dispatch(setTab({tab: tabItemIndex, item: 0}));
    dispatch(setHome(pathname==='/'));
  }, [pathname]);

  return (
    <div className={classes.root}>
      {home && <div style={{position:'absolute', top: 0, left:0, right:0, bottom:0}}>
        <div className={home?classes.bg:''} />
      </div>}
      <Container maxWidth="lg">
        <Grid container>
          <Header {...{title: 'Admin Control'}} style={{zIndex: '1500'}} />
          <FullWidthTabs {...{list: MENUS, value: tab, classes, onChange: handleTabChange}} />
          {home && <>{children}</>}
          {
            tab > -1 && (
              <>
                {(!home || smMatches) && <SubHeader {...{classes, desc: MENUS[tab].desc}} />}
                {!home && <Content {...{tab, item, classes, handleListItemClick}}>
                  {children}
                </Content>}
              </>
            )
          }
        </Grid>
      </Container>
    </div>
  );
};

export default Main;
