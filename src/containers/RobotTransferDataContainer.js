import React, {useState} from 'react';
import { Grid, Button, TextField, Card, CardContent, Typography, CardActions, Table, TableBody, TableRow, TableCell, InputAdornment, IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import ClearIcon from '@material-ui/icons/Clear';
import { useMount } from 'react-use';
import EnvSelect from '../components/EnvSelect';
import { getRobot, robotInitialize, transfertData } from '../features/robot';
import { useStyles } from '../styles/robotStyle';

const RobotTransferDataContainer = () => {
  const classes = useStyles();
  const [beforeSerial, setBeforeSerial] = useState('');
  const [afterSerial, setAfterSerial] = useState('');
  const dispatch = useDispatch();
  const selector = useSelector(state => state.robot);
  const { findError, robotData, transferResult, transferError } = selector;

  const handleTextChange = (e) => {
    const { target: { name, value}} = e;
    if(name === 'before') {
      setBeforeSerial(value);
    }
    if(name === 'after') {
      setAfterSerial(value);
    }
  };

  const handleClickClear = (e) => {
    const { target: { name }} = e;
    if(name === 'before') {
      setBeforeSerial('');
      dispatch(robotInitialize());
    }
    if(name === 'after') {
      setAfterSerial('');
    }
  }

  const handleFindClick = () => {
    dispatch(getRobot(beforeSerial));
  };

  const handleTransferClick = (userId) => () => {
    dispatch(transfertData({ serial: beforeSerial, newSerial: afterSerial, userId }));
  };

  useMount(() => {
    setBeforeSerial('');
    setAfterSerial('');
    dispatch(robotInitialize());
  });

  return (
    <Grid container
      direction="row"
      justifyContent="flex-start"
      alignItems="stretch"
      className={classes.root}
      spacing={2}
      >
        <Grid item xs={6} md={2} className={classes.marginVertical}>
          <EnvSelect />
        </Grid>
        <Grid container item xs={12} md={10} style={{display: 'inline-flex'}}>
          <Grid item>
            <TextField
              id="beforeSerial"
              name="before"
              className={classes.textField} 
              label='정보 이전을 위한 로봇의 ObjectId 또는 Serial No.를 입력하세요.'
              onChange={handleTextChange} 
              value={beforeSerial}
              error={findError}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (<InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickClear}
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>)
              }}
            />
          </Grid>
          <Grid item className={classes.marginVertical}>
            <Button variant="contained" color="primary"  onClick={handleFindClick}>검색</Button>
          </Grid>
        </Grid>
        {findError && (<Grid item xs={12}>
          <Typography variant="h6">{findError}</Typography>
        </Grid>)}
        <Grid container item xs={12}>
          {robotData.map(({_id: id, robotId, userId, }) => (
            <Grid item>
              <Card className={classes.cardRoot} key={id}>
                <CardContent>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell className={classes.cellProp}>
                          <Typography color="textSecondary">
                            userId
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <span className={classes.cardValue}>{userId}</span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.cellProp}>
                          <Typography color="textSecondary">
                            ObjectId
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <span className={classes.cardValue}>{id}</span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.cellProp}>
                          <Typography color="textSecondary">
                            Serial No.
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <span className={classes.cardValue}>{robotId}</span>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  {
                    !transferResult && (
                      <TextField
                        id="afterSerial"
                        name="after"
                        className={classes.cardTextField} 
                        label='새로운 로봇의 ObjectId 또는 Serial No.를 입력하세요.'
                        onChange={handleTextChange} 
                        value={afterSerial}
                        error={findError}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          endAdornment: (<InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickClear}
                          >
                            <ClearIcon />
                          </IconButton>
                        </InputAdornment>)
                        }}
                      />
                    )
                  }
                  {
                    (transferError || transferResult) && (
                      <Typography variant="subtitle1">
                        {
                          transferResult === false && <Typography variant="body2" color="textSecondary" className={classes.cardError}>{transferError}</Typography>
                        }
                        {
                          transferResult && !transferError && (
                            <>
                              <p>{`${beforeSerial} 로봇의 데이터가 ${afterSerial}`}</p>
                              <p>로봇에 이전되었습니다.</p>
                            </>
                            )
                        }
                      </Typography>
                    )
                  }
                </CardContent>
                {
                  !transferResult && (
                    <CardActions>
                      <Button size="small" color="secondary" className={classes.btn} onClick={handleTransferClick(userId)}>데이터 이전</Button>
                    </CardActions>
                  )
                }
              </Card>
            </Grid>
          ))}
        </Grid>
    </Grid>
  )
};

export default RobotTransferDataContainer;
