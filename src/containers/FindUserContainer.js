/* eslint-disable no-underscore-dangle */
import React, { Fragment, useEffect, useState } from 'react';
import moment from 'moment';
import { FormControl, RadioGroup, FormControlLabel, TextField, Radio, Chip, Grid, makeStyles, Typography, Button, TableContainer, Table, Paper, TableHead, TableRow, TableCell, TableBody, Divider, useMediaQuery } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from '@material-ui/lab';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import EnvSelect from '../components/EnvSelect';
import { setChipData, setSearchType, setConditions, findList} from '../features/find';

const useStyles = makeStyles((theme) => ({
  root: {
    flexFlow: 1,
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    '& .MuiGrid-item': {
      padding: `0 ${theme.spacing(1)}px`,
    }
  },
  searchName: {
    color: theme.palette.text.secondary,
    paddingTop: '0 !important',
    paddingBottom: '0 !important',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    textAlign: 'right',
  },
  conditions: {
    display: 'inline-flex',
    flexWrap: 'wrap',
  },
  itemsWrap: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    '& > div': {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      padding: '4px 0',
      '& > .MuiChip-root': {
        // marginRight: theme.spacing(1),
        margin: `${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(1)}px 0`,
      }
    },
    '& > *': {
      marginRight: theme.spacing(1),
    },
    '& .MuiTypography-root.MuiTypography-body1': {
      fontSize: '.875em',
      marginRight: theme.spacing(1),
      color: theme.palette.secondary.light,
    }
  },
  tableNoWrap: {
    whiteSpace: 'nowrap',
  },
  table: {
    margin: theme.spacing(1),
    '& svg.MuiSvgIcon-root': {
      verticalAlign: 'bottom',
    } 
  },
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    margin: 'auto 0',
    '& > button': {
      width: '100%',
    }
  },
  form: {
    // width: '100%',
    margin: 'auto 0',
    '&>.MuiGrid-container': {
      alignItems: 'center',
    },
    '& legend.MuiFormLabel-root': {
      color: theme.palette.text.secondary,
      paddingTop: '0 !important',
      paddingBottom: '0 !important',
      alignSelf: 'center',
      fontSize: 'inherit',
      textAlign: 'right',
    },
    '& .MuiFormGroup-root': {
      display: 'inline-flex',
      flexDirection: 'row',
    }
  },
  textField: {
    minWidth: '300px',
    maxWidth: '300px',
    width: '100%',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  marginVertical: {
    margin: 'auto 0',
  },
  pagination: {
    '& .MuiPagination-ul': {
      justifyContent: 'center',
    }
  }
}));

const FindUserContainer = () => {
  const classes = useStyles();
  const small = useMediaQuery('(max-width:600px)');
  const dispatch = useDispatch();
  const selector = useSelector(state => state.find);
  const { searchConditions, chipData, userList, radio, limit, totalPage } = selector;
  const [label, setLabel] = useState('사용자의 ObjectId 또는 userId를 입력하세요.');
  const [words, setWords] = useState('');

  const handleChipClick = (v) => () => {
    const indexes = v.split('-');
    if(indexes.length === 3) {
      const [j, k, l] = indexes;
      const index = parseInt(j, 10);
      const idx = parseInt(k, 10);
      const i = parseInt(l, 10);
      const list = searchConditions[index].list[idx].list.map((item, itemIdx) => {
        if(i === itemIdx) {
          return {...item, selected: !item.selected};
        }
        if(index > 0) {
          return {...item, selected: false};
        }

        return item;
      });
      dispatch(setConditions({index, idx, list}));
    }
  };

  const getQueries = (page) => {
    const queries = Object.values(chipData).reduce((params, item) => {
      let newArgs = {...params };
      const { key, value } = item;
      if(newArgs[key]) {
        if(key === 'verified') {
          newArgs[key] = 'all';
        } else {
          // 모두 선택일 경우 선택사항으로 넘겨주지 않도록 처리
          newArgs = Object.entries(newArgs).reduce((acc, [k, v]) => {
            if(k !== key) {
              return {...acc, [k]:v};
            }
            return acc;
          }, {});
        }
      } else {
        newArgs[key] = value;
      }
      return newArgs;
    }, {});
    if(words) {
      queries[radio] = words;
    };
    queries.skip = (page - 1) * limit

    return queries;
  }

  const handleFindClick = async () => {
    const queries = getQueries(1);
    dispatch(findList(queries));
  };
  
  const handleRadioChange = (e, v) => {
    dispatch(setSearchType(v));
  };

  const handleTextChange = (e) => {
    const { target: { value: v} } = e;
    const value = v.replace(/[^a-zA-Z\d]/g, '');
    setWords(value);
  };

  const handlePageChange = (e, v) => {
    const queries = getQueries(v);
    dispatch(findList(queries));
  };

  useEffect(() => {
    if(radio === 'user') {
      setLabel('사용자의 ObjectId 또는 userId를 입력하세요.');
    }
    if(radio === 'robot') {
      setLabel('로봇의 ObjectId 또는 Serial No.를 입력하세요.');
    }
  }, [radio]);

  useEffect(() => {
    const chips = searchConditions.reduce((acc, cur) => {
      const list = cur.list.reduce((accumulate, current) => {
        const findItem = current.list.filter(item => item.selected);
        if(findItem) {
          return findItem.reduce((x, y) => {
            const arr = [...x];
            arr.push({...y, key: current.value});
            return arr;
          }, [...accumulate]);
        }
        return accumulate;
      }, []);
      let newChips = [...acc];
      if(list.length) {
        newChips = acc.concat(list);
      }
      return newChips;
    }, []);
    dispatch(setChipData(chips.flat()));
  }, [searchConditions])


  return (
    <Grid container
      direction="row"
      justifyContent="flex-start"
      alignItems="stretch"
      className={classes.root}
      spacing={2}
    >
      {
        searchConditions.map(({key, label: l, list}, index) => (
        <Fragment key={key}>
          <Grid item xs={2} sm={1} className={classes.searchName}>{l}</Grid>
          <Grid item xs={10} sm={11} className={classes.conditions}>
          {
            list.map(({ item, value, list: items}, idx) => (
                <div key={`${key}-${value}`} className={classes.itemsWrap}>
                  <div>
                    {item && <Typography vibrant="subtitle2">{item}</Typography>}
                    {
                      items.map(({value: itemValue, label: itemLabel, selected}, i) => (
                        <Chip
                          key={`${value}-${itemValue}`}
                          label={itemLabel}
                          variant={selected ? 'default' : 'outlined'}
                          color={selected ? 'secondary' : 'default'}
                          size={small ? 'small' : 'medium'}
                          onClick={handleChipClick(`${index}-${idx}-${i}`)}
                          onDelete={selected ? handleChipClick(`${index}-${idx}-${i}`):null}
                        />
                      ))
                    }
                  </div>
                </div>
            ))
          }
          </Grid>
          <Divider style={{width: '100%'}} />
        </Fragment>))
      }
      <Grid item xs={6} md={2} className={classes.marginVertical}>
        <EnvSelect />
      </Grid>
      <Grid container item xs={12} md={10} style={{display: 'inline-flex'}}>
        <FormControl component="fieldset" className={classes.form}>
          <Grid item>
            <RadioGroup aria-label="type" name="findType" value={radio} onChange={handleRadioChange}>
              <FormControlLabel value="user" control={<Radio />} label="사용자" />
              <FormControlLabel value="robot" control={<Radio />} label="로봇" />
            </RadioGroup>
          </Grid>
        </FormControl>
        <Grid item>
          <TextField id="standard-basic" className={classes.textField} label={label} helperText="일부만 입력하여 검색할 수 있습니다." onChange={handleTextChange} value={words} />
        </Grid>
        <Grid item className={classes.marginVertical}>
          <Button variant="contained" color="primary"  onClick={handleFindClick}>검색</Button>
        </Grid>
      </Grid>
      <Divider style={{width: '100%'}} />
      <Grid item xs={12} />
      {userList && (<Grid item xs={12}>
        <TableContainer component={Paper} className={classes.table}>
          <Table size={small?'small':'medium'} className={classes.table} aria-label="user list table">
            <TableHead>
              <TableRow>
                <TableCell>ObjectId(Physical)</TableCell>
                <TableCell>유저 아이디(Logical)</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>로봇</TableCell>
                <TableCell>닉네임</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>이메일</TableCell>
                <TableCell>전화번호</TableCell>
                <TableCell>가입일</TableCell>
                <TableCell>정보수정일</TableCell>
                <TableCell>탈퇴여부</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((row) => (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    {row._id}
                  </TableCell>
                  <TableCell>{row.userId}</TableCell>
                  <TableCell className={classes.tableNoWrap}>{`${row.lastName} ${row.firstName}`}</TableCell>
                  <TableCell>{'pibo' in row ? row.pibo.robotId:'-'}</TableCell>
                  <TableCell>{row.nickName}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell className={classes.tableNoWrap}>{moment(new Date(row.birthDate)).format('YYYY-MM-DD')}</TableCell>
                  <TableCell className={classes.tableNoWrap}>{row.verified && 'email' in row.verified && <VerifiedUserIcon fontSize="small" color="secondary"/>}{'email' in row ? row.email:''}</TableCell>
                  <TableCell className={classes.tableNoWrap}>{row.verified && 'tel' in row.verified && <VerifiedUserIcon fontSize="small" color="secondary" />}{row.tel || ''}</TableCell>
                  <TableCell className={classes.tableNoWrap}>{moment(new Date(row.firstTime)).format('YYYY-MM-DD HH:mm')}</TableCell>
                  <TableCell className={classes.tableNoWrap}>{moment(new Date(row.lastTime)).format('YYYY-MM-DD HH:mm')}</TableCell>
                  <TableCell>{!row.use && '탈퇴'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>)}
      {userList && userList.length > 0 && (<Grid item xs={12}><Pagination count={totalPage} className={classes.pagination} onChange={handlePageChange}/></Grid>)}
    </Grid>
  )
};

export default FindUserContainer;
