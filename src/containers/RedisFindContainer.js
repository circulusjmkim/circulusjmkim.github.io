import React, {useState} from 'react';
import { Grid, TextField, 
  // Button, Card, CardContent, Typography, CardActions, Table, TableBody, TableRow, TableCell, Chip, 
  InputAdornment, IconButton, FormGroup, Typography } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { useStyles } from '../styles/robotStyle';
import EnvSelect from '../components/EnvSelect';
import AntSwitch from '../components/AntSwitch';

const RedisFindContainer = () => {
  const classes = useStyles();
  // `모드 선택 => 로봇/사용자 토글 선택 => userId, userObjectId, robotId, robotObjectId 검색`}</div>
  const [bUser, setState] = useState(true);

  const handleChange = () => {
    setState(!bUser);
  };

  const handleTextChange = (e) => {
    console.log(e);
    // dispatch(textChange(e));
  };
  
  const handleClickClear = (e) => {
    console.log(e);
    // dispatch(clearClick(e));
  };

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
        <Grid item className={classes.marginVertical}>
          <FormGroup>
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>로봇</Grid>
                <Grid item>
                  <AntSwitch checked={bUser} onChange={handleChange} />
                </Grid>
                <Grid item>사용자</Grid>
              </Grid>
            </Typography>
          </FormGroup>
        </Grid>
        <Grid item>
          <TextField
            id="standard-basic"
            className={classes.textField} 
            label={bUser?'사용자의 아이디를 입력하세요.':'로봇의 ObjectId 또는 Serial No.를 입력하세요.'}
            onChange={handleTextChange} 
            // value={words || ''}
            // error={dataError}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (<InputAdornment position="end">
              <IconButton
                aria-label="robot id input value clear"
                onClick={handleClickClear}
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>)
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RedisFindContainer;
