import React, {Fragment, useEffect, useState} from 'react';
import { View,ScrollView, Text, TextInput, TouchableOpacity, Picker, FlatList} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import {TextInputMask} from 'react-native-masked-text';
import http from '../../services/axiosconf';
import querystring from 'query-string';
import moment from 'moment-timezone';
import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-community/async-storage';
//import {Picker} from '@react-native-community/picker';

import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';

import styles from './style';

export default function HandBook({navigation}) {

    const [user, setUser ] = useState(true);
    const [token, setToken ] = useState(true);
    const [userid, setUserId] = useState();

    const [ patients, setPatients] = useState(0);
    const [selectItems, setSelectItems] =useState(true);

    useEffect(() => {
        AsyncStorage.multiGet(['Token','User','UserId'])
            .then((res) => {
                setUser(res[1][1])
                setToken(res[0][1])
                setUserId(res[2][1])
            })
            .catch((error) => {
                console.log('Error Get AsyncStorage',error)
            })
            

    })

  return (
    <Formik
        initialValues={{
            nome: '',
            limitacoes: '',
            altura: '',
            peso: '',
            data_servico: '',
            reclamacoes: '',
            sintomas: '',
            sinais_vitais: '',
            tipo_sanguineo: '',
            pressao_sanguinea: '',
            hgt: '',
            temperatura: '',

        }}
        validationSchema={yup.object().shape({
            nome: yup
                .string()
                .required('Nome é um campo obrigatório')
                .min(5,'O Campo tem que ter mais de 5 caracteres')
                .max(50, 'O Campo não pode passar de 50 caracteres'),
            
            limitacoes: yup
                .string()
                .required('Limitaçoes é um campo obrigatório'),
            
            altura: yup
                .number()
                .required('Altura é um campo obrigatório')
                .positive(),

            peso: yup
                .number()
                .required('Peso é um campo obrigatório')
                .positive(),
            
            reclamacoes: yup
                .string()
                .required('Reclamaçoes é um campo obrigatório')
                .min(5,'O Campo tem que ter mais de 5 caracteres')
                .max(500, 'O Campo não pode passar de 500 caracteres'),

            sintomas: yup
                .string()
                .required('Sintomas é um campo obrigatório')
                .min(5,'O Campo tem que ter mais de 5 caracteres')
                .max(100, 'O Campo não pode passar de 100 caracteres'),
            
            sinais_vitais: yup
                .string()
                .required('Sinais Vitais é um campo obrigatório')
                .min(5,'O Campo tem que ter mais de 5 caracteres')
                .max(50, 'O Campo não pode passar de 50 caracteres'),

            tipo_sanguineo: yup
                .string()
                .required('Tipo Sanguineo é um campo obrigatório'),
                
            pressao_sanguinea: yup
                .number()
                .integer()
                .positive(),
                
            hgt: yup
                .number()
                .integer()
                .positive(),
            
        })}>

        {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit
        }) => (
            <ScrollView style={styles.scrollView}>
                    <Text style={styles.textInput}>Nome do Paciente</Text>
                    { navigation.state.params.userName && (
                        <Text>{navigation.state.params.userName}</Text>
                    )}
                    <Text style={styles.textInput}>Nome do Prontuario</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleChange('nome')}
                        value={values.nome}
                        onBlur={() => setFieldTouched('nome')}
                    />

                    <View>
                        {touched.nome && errors.nome && (
                            <Text style={styles.validationError}>{errors.nome}</Text>
                        ) }
                    </View>
                    <Text style={styles.textInput}>Limitaçoes</Text>
                    <Picker
                        selectedValue={values.limitacoes}
                        style={styles.picker}
                        onValueChange={handleChange('limitacoes')}
                        onBlur={() => setFieldTouched('limitacoes')} >
                        <Picker.Item label="Escolha uma opção" value=""/>
                        <Picker.Item label="Cognitivo" value="Cognitive"/>
                        <Picker.Item label="Locomoção" value="Locomotion"/>
                        <Picker.Item label="Visão" value="Vision"/>
                        <Picker.Item label="Audição" value="Hearing"/>
                        <Picker.Item label="Nenhuma" value="None"/>
                    </Picker>
                    <View>
                        {touched.limitacoes && errors.limitacoes && (
                            <Text style={styles.validationError}>{errors.limitacoes}</Text>
                        ) }
                    </View>
                    <Text style={styles.textInput}>Altura</Text>
                    <TextInputMask
                        type={'custom'}
                        maxLength={4}
                        options={{
                            delimiter: '.',
                            mask: '9.99'
                        }}
                        style={styles.input}
                        onChangeText={handleChange('altura')}
                        value={values.altura}
                        onBlur={() => setFieldTouched('altura')}
                    
                    />
                    <View>
                        {touched.altura && errors.altura && (
                            <Text style={styles.validationError}>{errors.altura}</Text>
                        ) }
                    </View>
                    <Text style={styles.textInput}>Peso</Text>
                    <TextInputMask
                        type={'custom'}
                        options={{
                            delimiter: '.',
                            mask: '99.9'
                        }}
                        style={styles.input}
                        onChangeText={handleChange('peso')}
                        value={values.peso}
                        onBlur={() => setFieldTouched('peso')}
                        placeholder="Ex. 55.4"
                    />
                    <View>
                        {touched.peso && errors.peso && (
                            <Text style={styles.validationError}>{errors.peso}</Text>
                        )}
                    </View>


                    <Text style={styles.textInput}>Reclamacoes</Text>
                    <AutoGrowingTextInput
                        style={styles.inputArea}
                        onChangeText={handleChange('reclamacoes')}
                        value={values.reclamacoes}
                        onBlur={() => setFieldTouched('reclamacoes')}
                        maxHeight={200}
                        minHeight={45}
                        
                    />
                    <View>
                        {touched.reclamacoes && errors.reclamacoes && (
                            <Text style={styles.validationError}>{errors.reclamacoes}</Text>
                        ) }
                    </View>

                    <Text style={styles.textInput}>Sintomas</Text>
                    <AutoGrowingTextInput
                        style={styles.input}
                        onChangeText={handleChange('sintomas')}
                        value={values.sintomas}
                        onBlur={() => setFieldTouched('sintomas')}
                        maxHeight={200}
                        minHeight={45}
                    />
                    <View>
                        {touched.sintomas && errors.sintomas && (
                            <Text style={styles.validationError}>{errors.sintomas}</Text>
                        ) }
                    </View>

                    <Text style={styles.textInput}>Sinais Vitais</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleChange('sinais_vitais')}
                        value={values.sinais_vitais}
                        onBlur={() => setFieldTouched('sinais_vitais')}
                    />
                    <View>
                        {touched.sinais_vitais && errors.sinais_vitais && (
                            <Text style={styles.validationError}>{errors.sinais_vitais}</Text>
                        )}
                    </View>

                    <Text style={styles.textInput}>Tipo Sanguineo</Text>
                    <Picker
                        selectedValue={values.tipo_sanguineo}
                        style={styles.picker}
                        onValueChange={handleChange('tipo_sanguineo')}
                        onBlur={() => setFieldTouched('tipo_sanguineo')} >
                        <Picker.Item label="Escolha uma opção" value=""/>
                        <Picker.Item label="A+" value="A+"/>
                        <Picker.Item label="A-" value="A-"/>
                        <Picker.Item label="B+" value="B+"/>
                        <Picker.Item label="B-" value="B-"/>
                        <Picker.Item label="AB+" value="AB+"/>
                        <Picker.Item label="AB-" value="AB-"/>
                        <Picker.Item label="O+" value="O+"/>
                        <Picker.Item label="O-" value="O-"/>
                    </Picker>
                        
                    <Text style={styles.textInput}>Pressao Sanguinea</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleChange('pressao_sanguinea')}
                        value={values.pressao_sanguinea}
                        onBlur={() => setFieldTouched('pressao_sanguinea')}
                    />
                    <View>
                        {touched.pressao_sanguinea && errors.pressao_sanguinea && (
                            <Text style={styles.validationError}>{errors.pressao_sanguinea}</Text>
                        )}
                    </View>
                        
                    <Text style={styles.textInput}>HGT (Nível Glicemia)</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleChange('hgt')}
                        value={values.hgt}
                        onBlur={() => setFieldTouched('hgt')}
                    />
                    <View>
                        {touched.hgt && errors.hgt && (
                            <Text style={styles.validationError}>{errors.hgt}</Text>
                        )}
                    </View>

                    <TouchableOpacity
                        style={styles.submitButton}
                        disabled={!isValid}
                        onPress={handleSubmit}>
                        <Text style={styles.submitText}> Registrar </Text>
                    </TouchableOpacity>
            </ScrollView>
            
        )}
    </Formik>
  );
}

Calcular_massa_corporal = (peso, altura) =>{
    return peso / (altura * altura);
}


Cadastrar_Handbook = async (values) =>{
    //this.Calcular_massa_corporal(values.peso, values.altura);
    await http.post('/handbook/register',querystring.stringify({
        name_handbook: values.nome,
        limitation: values.limitacoes,
        body_mass: this.Calcular_massa_corporal(values.peso, values.altura),
        weight: values.peso,
        service_date: moment( new Date() ).tz( RNLocalize.getTimeZone() ).format(),
        complaints: values.reclamacoes,
        symptoms:  values.sintomas,
        vital_sigins: values.sinais_vitais,
        blood_type: values.tipo_sanguineo,
        blood_pressure: values.pressao_sanguinea,
        hgt: values.hgt,
        temperature: values.temperatura,
        patient_id: navigation.state.params.userId,
        doctor_id: this.userid,    


    }),
    {

    })
}

