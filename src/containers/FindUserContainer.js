/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  TextField,
  Radio,
  Chip,
  Grid,
  Typography,
  Button,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogTitle,
  darken,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { makeStyles, styled } from '@mui/styles';
import EnvSelect from '../components/EnvSelect';
import {
  setChipData,
  setSearchType,
  setConditions,
  findList,
} from '../features/find';
import UserDialogContent from '../components/UserDialogContent';

const useStyles = makeStyles((theme) => ({
  root: {
    flexFlow: 1,
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    '& .MuiGrid-item': {
      padding: `0 ${theme.spacing(1)}`,
    },
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
        margin: `${theme.spacing(1)} ${theme.spacing(1)} ${theme.spacing(1)} 0`,
      },
    },
    '& > *': {
      marginRight: theme.spacing(1),
    },
    '& .MuiTypography-root.MuiTypography-body1': {
      fontSize: '.875em',
      marginRight: theme.spacing(1),
      color: theme.palette.secondary.light,
    },
  },
  tableNoWrap: {
    whiteSpace: 'nowrap',
  },
  tableEllipsis: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    maxWidth: '160px',
    overflow: 'hidden',
  },
  table: {
    margin: theme.spacing(1),
    '& svg.MuiSvgIcon-root': {
      verticalAlign: 'bottom',
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    margin: 'auto 0',
    '& > button': {
      width: '100%',
    },
  },
  form: {
    // width: '100%',
    margin: 'auto 0',
    '&>.MuiGrid-container': {
      alignItems: 'center',
    },
    // '& legend.MuiFormLabel-root': {
    //   color: theme.palette.text.secondary,
    //   paddingTop: '0 !important',
    //   paddingBottom: '0 !important',
    //   alignSelf: 'center',
    //   fontSize: 'inherit',
    //   textAlign: 'right',
    // },
    '& .MuiFormGroup-root': {
      display: 'inline-flex',
      flexDirection: 'row',
    },
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
    },
  },
}));

const CustomTableContainer = styled(TableContainer)(({ theme }) => ({
  overflowY: 'scroll',
  overflowX: 'auto',
  width: '100%',
  cursor: 'pointer',
  '&::-webkit-scrollbar': {
    width: '6px',
    height: '6px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
    borderRadius: '3px',
    margin: '3px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.divider,
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: `${darken(theme.palette.divider, 0.16)}`,
    borderRadius: '3px',
  },
  '& .MuiDataGrid-virtualScroller': {
    '&::-webkit-scrollbar': {
      width: '6px',
      height: '6px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
      borderRadius: '3px',
      margin: '3px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.divider,
      borderRadius: '3px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: `${darken(theme.palette.divider, 0.16)}`,
      borderRadius: '3px',
    },
  },
}));

const FindUserContainer = () => {
  const classes = useStyles();
  const small = useMediaQuery('(max-width:600px)');
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.find);
  const { searchConditions, userList, radio, totalPage } = selector;
  const [label, setLabel] = useState(
    '사용자의 ObjectId 또는 userId를 입력하세요.',
  );
  const [words, setWords] = useState('');
  const descriptionElementRef = React.useRef(null);
  const [[open, selectItem], setOpen] = useState([false, null]);

  const handleChipClick = (v) => () => {
    const indexes = v.split('-');
    if (indexes.length === 3) {
      const [j, k, l] = indexes;
      const index = parseInt(j, 10);
      const idx = parseInt(k, 10);
      const i = parseInt(l, 10);
      const list = searchConditions[index].list[idx].list.map(
        (data, itemIdx) => {
          if (i === itemIdx) {
            return { ...data, selected: index === 0 ? !data.selected : true };
          }
          if (index > 0) {
            return { ...data, selected: false };
          }

          return data;
        },
      );
      dispatch(setConditions({ index, idx, list }));
    }
  };

  const handleFindClick = async () => {
    dispatch(findList({ words }));
  };

  const handleRadioChange = (e, v) => {
    dispatch(setSearchType(v));
  };

  const handleTextChange = (e) => {
    const {
      target: { value: v },
    } = e;
    const value = v.replace(/[^a-zA-Z\d]/g, '');
    setWords(value);
  };

  const handlePageChange = (e, v) => {
    dispatch(findList({ words, page: v }));
  };

  const handleClickOpen = (data) => () => {
    setOpen([true, data]);
  };

  const handleClose = () => {
    setOpen([false, null]);
  };

  useEffect(() => {
    if (radio === 'user') {
      setLabel('사용자의 ObjectId 또는 userId를 입력하세요.');
    }
    if (radio === 'robot') {
      setLabel('로봇의 ObjectId 또는 Serial No.를 입력하세요.');
    }
  }, [radio]);

  useEffect(() => {
    const chips = searchConditions.reduce((acc, cur) => {
      const list = cur.list.reduce((accumulate, current) => {
        const findItem = current.list.filter((item) => item.selected);
        if (findItem) {
          return findItem.reduce(
            (x, y) => {
              const arr = [...x];
              arr.push({ ...y, key: current.value });
              return arr;
            },
            [...accumulate],
          );
        }
        return accumulate;
      }, []);
      let newChips = [...acc];
      if (list.length) {
        newChips = acc.concat(list);
      }
      return newChips;
    }, []);
    dispatch(setChipData(chips.flat()));
    handleFindClick();
  }, [searchConditions]);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="stretch"
        className={classes.root}
        spacing={2}
      >
        {searchConditions.map(({ key, label: l, list }, index) => (
          <Grid container item xs={12} key={key}>
            <Grid item xs={2} sm={1} className={classes.searchName}>
              {l}
            </Grid>
            <Grid item xs={10} sm={11} className={classes.conditions}>
              {list.map(({ item, value, list: items }, idx) => (
                <div key={`${key}-${value}`} className={classes.itemsWrap}>
                  <div>
                    {item && (
                      <Typography variant="subtitle2" sx={{ mr: 1 }}>
                        {item}
                      </Typography>
                    )}
                    {items.map(
                      ({ value: itemValue, label: itemLabel, selected }, i) => (
                        <Chip
                          key={`${value}-${itemValue}`}
                          label={itemLabel}
                          variant={selected ? 'default' : 'outlined'}
                          color={selected ? 'secondary' : 'default'}
                          size={small ? 'small' : 'medium'}
                          onClick={handleChipClick(`${index}-${idx}-${i}`)}
                          onDelete={
                            key === 'filter' && selected
                              ? handleChipClick(`${index}-${idx}-${i}`)
                              : null
                          }
                        />
                      ),
                    )}
                  </div>
                </div>
              ))}
            </Grid>
            <Divider style={{ width: '100%' }} />
          </Grid>
        ))}
        <Grid item xs={6} md={2} className={classes.marginVertical}>
          <EnvSelect onChange={handleFindClick} />
        </Grid>
        <Grid container item xs={12} md={10} style={{ display: 'inline-flex' }}>
          <FormControl component="fieldset" className={classes.form}>
            <Grid item>
              <RadioGroup
                aria-label="type"
                name="findType"
                value={radio}
                onChange={handleRadioChange}
              >
                <FormControlLabel
                  value="user"
                  control={<Radio />}
                  label="사용자"
                />
                <FormControlLabel
                  value="robot"
                  control={<Radio />}
                  label="로봇"
                />
              </RadioGroup>
            </Grid>
          </FormControl>
          <Grid item>
            <TextField
              id="standard-basic"
              sx={{
                minWidth: '300px',
                maxWidth: '300px',
                width: '100%',
              }}
              label={label}
              helperText="일부만 입력하여 검색할 수 있습니다."
              onChange={handleTextChange}
              value={words}
            />
          </Grid>
          <Grid item className={classes.marginVertical}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFindClick}
            >
              검색
            </Button>
          </Grid>
        </Grid>
        <Divider style={{ width: '100%' }} />
        <Grid item xs={12} />
        {userList && (
          <Grid item xs={12}>
            <CustomTableContainer component={Paper} className={classes.table}>
              <Table
                size="small"
                className={classes.table}
                aria-label="user list table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>아이디</TableCell>
                    <TableCell>이름</TableCell>
                    <TableCell>로봇</TableCell>
                    <TableCell>인증정보</TableCell>
                    <TableCell>가입일</TableCell>
                    <TableCell>수정일</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userList.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ opacity: row.use ? 1 : 0.25, cursor: 'pointer' }}
                      onClick={handleClickOpen(row)}
                    >
                      <TableCell>{row.userId}</TableCell>
                      <TableCell
                        className={classes.tableNoWrap}
                      >{`${row.lastName} ${row.firstName}`}</TableCell>
                      <TableCell className={classes.tableEllipsis}>
                        {row.pibo.length
                          ? row.pibo.reduce(
                              (a, c) => (a ? `${a}, ${c.robotId}` : c.robotId),
                              '',
                            )
                          : '-'}
                      </TableCell>
                      <TableCell className={classes.tableNoWrap}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: '6px',
                          }}
                        >
                          {row.verified &&
                            ('email' in row.verified ||
                              'tel' in row.verified) &&
                            (row.verified.email || row.verified.tel) && (
                              <VerifiedUserIcon
                                fontSize="small"
                                color="secondary"
                              />
                            )}
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                            }}
                          >
                            {'email' in row ? <span>{row.email}</span> : ''}
                            {'tel' in row ? <span>{row.tel}</span> : ''}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className={classes.tableNoWrap}>
                        {moment(new Date(row.firstTime)).format(
                          'YYYY-MM-DD HH:mm',
                        )}
                      </TableCell>
                      <TableCell className={classes.tableNoWrap}>
                        {moment(new Date(row.lastTime)).format(
                          'YYYY-MM-DD HH:mm',
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CustomTableContainer>
          </Grid>
        )}
        {userList && userList.length > 0 && (
          <Grid item xs={12}>
            <Pagination
              count={totalPage}
              className={classes.pagination}
              onChange={handlePageChange}
            />
          </Grid>
        )}
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{`${
          selectItem && selectItem.userId
        } 정보`}</DialogTitle>
        {selectItem && <UserDialogContent data={selectItem} />}
        <DialogActions>
          <Button onClick={handleClose}>닫기</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FindUserContainer;
