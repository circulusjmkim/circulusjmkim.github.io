const MENUS = [
  {
    key: '00_find',
    value: 'find', 
    label: '검색 및 조회',
    desc: '사용자 및 로봇의 일부 정보를 활용하여 검색하여 조회하거나 사용자 및 로봇 목록을 조회합니다.',
    list: [
      {path: 'users', value: 'find_user', label: '사용자 목록 조회', desc: '검색어 및 필터를 적용하여 원하는 정보를 확인 할 수 있습니다.'},
    ]
  },
  {
    key: '01_robot',
    value: 'robot',
    label: '로봇',
    desc: '로봇 데이터와 관련한 기능을 관리자가 직접 수행할 수 있습니다.',
    list: [
      {path: 'connect', value: 'robot_conn', label: '로봇 연결', desc: '로봇과 사용자를 관리자가 임의로 등록합니다.' },
      {path: 'disconnect', value: 'robot_disconn', label: '로봇 연결 해제', desc: '로봇의 물리적 또는 논리적 아이디로 해당 로봇의 사용자(user, manager)와의 연결을 해제합니다.' },
      {path: 'transfer', value: 'robot_transfer_data', label: '로봇 데이터 이전', desc: '로봇의 시리얼 번호가 변경되었을 경우 새로운 시리얼로 기존 정보를 이용할 수 있도록 데이터를 이전합니다.' },
      {path: 'clear', value: 'robot_clear_data', label: '로봇 데이터 클리어', desc: '로봇의 물리적 또는 논리적 아이디와 관련된 모든 데이터(설치된 bot 정보, bot의 모든 연관 데이터(Optional))를 초기화합니다.\n*테스트 데이터 계정에서만 사용할 것을 권장합니다.' },
    ]
  },
  {
    key: '02_user',
    value: 'user',
    label: '사용자',
    desc: '사용자와 관련한 기능을 관리자가 직접 수행할 수 있습니다.',
    list: [
      {path: 'signup', value: 'user_signup', label: '사용자 회원가입', desc: '최소한의 정보로 사용자 계정을 생성합니다.'},
      {path: 'password', value: 'user_update_pw', label: '사용자 비밀번호 변경', desc: '사용자의 물리적 또는 논리적 아이디로 해당 사용자의 비밀번호를 변경합니다.'},
      {path: 'verify', value: 'user_update_verified', label: '사용자 인증정보 변경', desc: '사용자의 물리적 또는 논리적 아이디로 해당 사용자의 인증정보(tel, email) 정보를 변경합니다.'},
      {path: 'delete', value: 'user_update_bakdata', label: '사용자 탈퇴 정보 삭제 및 백업', desc: '한달 간격으로 이루어지는 탈퇴 사용자에 대한 정보 백업을 탈퇴 회원 정보로 조회하여 즉시 실행합니다.\n*(탈퇴한 아이디, 이메일, 전화번호 등의 재사용 요청 시 사용)'},
      {path: 'clear', value: 'user_clear_data', label: '사용자 데이터 클리어', desc: '사용자의 물리적 또는 논리적 아이디와 관련된 모든 데이터(사용자의 로봇, 로봇에 설치된 bot 정보, 해당 로봇 bot의 모든 연관 데이터(Optional))를 삭제합니다.\n*테스트 데이터 삭제에만 사용할 것을 권장합니다.'},
    ]
  },
  {
    key: '03_redis',
    value: 'redis',
    label: 'redis 인증',
    desc: 'redis 인증 정보를 조회 및 등록 할 수 있습니다.',
    list: [
      {path: 'find', value: 'redis_find', label: 'Redis 조회', desc: '사용자 및 로봇 정보로 Redis를 조회합니다.' },
      {path: 'add', value: 'redis_add', label: 'Redis 등록', desc: '사용자 및 로봇 정보를 Redis에 등록합니다.'},
    ]
  },
  {
    key: '04_notice',
    value: 'notice',
    label: '공지사항',
    desc: '공지사항을 등록 및 관리(수정, 삭제, 노출순서변경)를 할 수 있습니다.',
    list: [
      {path: 'add', value: 'notice_add', label: '공지사항 등록', desc: '모바일에 보여지는 공지사항을 등록합니다.'},
      {path: 'update', value: 'notice_update', label: '공지사항 관리', desc: '모바일에 보여지는 공지사항을 수정, 삭제, 노출 순서 등을 변경합니다.'},
    ]
  }
];

const SEARCH_CONDITIONS = [
  { 
    key: 'filter',
    label: '필터',
    list: [
      {
        item: '가입상태',
        value: 'use',
        list: [
          {value: true, label:'회원', selected: false},
          {value: false, label:'탈퇴', selected: false},
        ]
      },
      {
        item: '인증',
        value: 'verified',
        list: [
          {value: 'email', label:'이메일', selected: false},
          {value: 'tel', label:'문자', selected: false}
        ]
      },
      {
        item: '로봇',
        value: 'connected',
        list: [
          {value: true, label:'연결', selected: false},
          {value: false, label: '미연결', selected: false}
        ]
      }
    ]
  },
  {
    key: 'align',
    label: '정렬',
    list: [
      {
        item: '기준',
        value: 'sort',
        list: [
          {value: 'firstTime', label:'가입일', selected: true},
          {value: 'lastTime', label: '정보수정일', selected: false},
          {value: 'userId', label:'아이디', selected: false},
        ]
      },
      {
        item: '방식',
        value: 'desc',
        list: [
          {value: true, label:'내림차순', selected: true},
          {value: false, label:'오름차순', selected: false},
        ]
      }
    ]
  },
  {
    key: 'view',
    label: '페이지뷰',
    list:[
      {
        item: null,
        value: 'limit',
        list: [
          {value: 10, label: 10, selected: true},
          {value: 25, label: 25, selected: false},
          {value: 50, label: 50, selected: false},
          {value: 100, label: 100, selected: false},
        ]
      }
    ]
  },
];

const MANAGER_ROLE = '2211';
const ROBOT_MENU_CONNECT = 0;
const ROBOT_MENU_DISCONNECT = 1;
const ROBOT_MENU_TRANSFER = 2;
const ROBOT_MENU_CLEAR = 3;

export {
  MENUS, 
  SEARCH_CONDITIONS,
  MANAGER_ROLE,
  ROBOT_MENU_CONNECT,
  ROBOT_MENU_DISCONNECT,
  ROBOT_MENU_TRANSFER,
  ROBOT_MENU_CLEAR,
};
