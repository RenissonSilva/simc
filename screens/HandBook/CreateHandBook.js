import React, {Fragment} from 'react';
import { View,ScrollView, Text, TextInput, TouchableOpacity, Picker} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
//import {Picker} from '@react-native-community/picker';

import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';

import styles from './style';

export default function HandBook() {
  return (
    <Formik
        initialValues={{
            nome: '',
            limitacoes: '',
            massa_corporal: '',
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
                .required('Nome é um campo obrigatório'),
            
            massa_corporal: yup
                .number()
                .integer()
                .positive(),

            peso: yup
                .number()
                .integer()
                .positive(),

            data_servico: yup
                .string()
                .required('Nome é um campo obrigatório'),
            
            reclamacoes: yup
                .string()
                .required('Nome é um campo obrigatório')
                .min(5,'O Campo tem que ter mais de 5 caracteres')
                .max(500, 'O Campo não pode passar de 500 caracteres'),

            sintomas: yup
                .string()
                .required('Nome é um campo obrigatório')
                .min(5,'O Campo tem que ter mais de 5 caracteres')
                .max(100, 'O Campo não pode passar de 100 caracteres'),
            
            sinais_vitais: yup
                .string()
                .required('Nome é um campo obrigatório')
                .min(5,'O Campo tem que ter mais de 5 caracteres')
                .max(50, 'O Campo não pode passar de 50 caracteres'),

            tipo_sanguineo: yup
                .string()
                .required('Nome é um campo obrigatório'),
                
            pressao_sanguinea: yup
                .number()
                .integer()
                .positive(),
                
            hgt: yup
                .number()
                .integer()
                .positive(),
            
        })}>

        {({values,handleChange, errors , setFieldTouched, touched, isValid, handleSubmit}) => (
        <ScrollView style={styles.scrollView}>
           <Fragment>
                <Text style={styles.textInput}>Nome</Text>
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
                <TextInput
                    style={styles.input}
                    onChangeText={handleChange('limitacoes')}
                    value={values.limitacoes}
                    onBlur={() => setFieldTouched('limitacoes')}
                />
                <View>
                    {touched.limitacoes && errors.limitacoes && (
                        <Text style={styles.validationError}>{errors.limitacoes}</Text>
                    ) }
                </View>
                <Text style={styles.textInput}>Massa Corporal</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleChange('massa_corporal')}
                    value={values.massa_corporal}
                    onBlur={() => setFieldTouched('massa_corporal')}
                />
                <View>
                    {touched.massa_corporal && errors.massa_corporal && (
                        <Text style={styles.validationError}>{errors.massa_corporal}</Text>
                    ) }
                </View>
                <Text style={styles.textInput}>Peso</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleChange('peso')}
                    value={values.peso}
                    onBlur={() => setFieldTouched('peso')}
                />
                <View>
                    {touched.peso && errors.peso && (
                        <Text style={styles.validationError}>{errors.peso}</Text>
                    ) }
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

            </Fragment>
        </ScrollView>
        
        )}
    </Formik>
  );
}
