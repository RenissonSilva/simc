import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  imgUser: {
    width: 100,
    height: 100,
    marginRight: 20,
    marginVertical: 20,
    borderRadius: 50,
  },
  name: {
    fontSize: 20,
    color: '#FF5F54',
    marginTop: 20,
    fontWeight: 'bold',
  },
  msg: {
    fontSize: 15,
    color: '#969696',
  },
  boxChat: {
    flexDirection: 'row',
    borderTopColor: '#ccc',
    borderTopWidth: StyleSheet.hairlineWidth,
    width: '90%',
    alignSelf: 'center',
  },
  boxMsg: {
    width: 210,
    marginTop: 10,
  },
});
