import React, {Fragment} from 'react';
import { View,ScrollView, Picker, Text, TextInput,   TouchableOpacity} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

// import { Container } from './styles';

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
            <Fragment>
                <Text>Name</Text>
                <TextInput
                    onChangeText={handleChange('nome')}
                    value={values.nome}
                    onBlur={() => setFieldTouched('nome')}

                />
                <View>
                    {touched.nome && errors.nome && (
                        <Text>{errors.nome}</Text>
                    ) }
                </View>
                <Text>Limitaçoes</Text>
                <TextInput
                    onChangeText={handleChange('limitacoes')}
                    value={values.limitacoes}
                    onBlur={() => setFieldTouched('limitacoes')}
                />
                <View>
                    {touched.limitacoes && errors.limitacoes && (
                        <Text>{errors.limitacoes}</Text>
                    ) }
                </View>
                <Text>Massa Corporal</Text>
                <TextInput
                    onChangeText={handleChange('massa_corporal')}
                    value={values.massa_corporal}
                    onBlur={() => setFieldTouched('massa_corporal')}
                />
                <View>
                    {touched.massa_corporal && errors.massa_corporal && (
                        <Text>{errors.massa_corporal}</Text>
                    ) }
                </View>
                <Text>Peso</Text>
                <TextInput
                    onChangeText={handleChange('peso')}
                    value={values.peso}
                    onBlur={() => setFieldTouched('peso')}
                />
                <View>
                    {touched.peso && errors.peso && (
                        <Text>{errors.peso}</Text>
                    ) }
                </View>
                <Text>Peso</Text>
                <TextInput
                    onChangeText={handleChange('peso')}
                    value={values.peso}
                    onBlur={() => setFieldTouched('peso')}
                />
                <View>
                    {touched.peso && errors.peso && (
                        <Text>{errors.peso}</Text>
                    ) }
                </View>

                <Text>Date</Text>

                <Text>Reclamacoes</Text>
                <TextInput
                    onChangeText={handleChange('reclamacoes')}
                    value={values.reclamacoes}
                    onBlur={() => setFieldTouched('reclamacoes')}
                />
                <View>
                    {touched.reclamacoes && errors.reclamacoes && (
                        <Text>{errors.reclamacoes}</Text>
                    ) }
                </View>

                <Text>Sintomas</Text>
                <TextInput
                    onChangeText={handleChange('sintomas')}
                    value={values.sintomas}
                    onBlur={() => setFieldTouched('sintomas')}
                />
                <View>
                    {touched.sintomas && errors.sintomas && (
                        <Text>{errors.sintomas}</Text>
                    ) }
                </View>

                <Text>Sinais Vitais</Text>
                <TextInput
                    onChangeText={handleChange('sinais_vitais')}
                    value={values.sinais_vitais}
                    onBlur={() => setFieldTouched('sinais_vitais')}
                />
                <View>
                    {touched.sinais_vitais && errors.sinais_vitais && (
                        <Text>{errors.sinais_vitais}</Text>
                    )}
                </View>

                <Text>Tipo Sanguineo</Text>
                    
                <Text>Pressao Sanguinea</Text>
                <TextInput
                    onChangeText={handleChange('pressao_sanguinea')}
                    value={values.pressao_sanguinea}
                    onBlur={() => setFieldTouched('pressao_sanguinea')}
                />
                <View>
                    {touched.pressao_sanguinea && errors.pressao_sanguinea && (
                        <Text>{errors.pressao_sanguinea}</Text>
                    )}
                </View>
                    
                <Text>HGT (Nível Glicemia)</Text>
                <TextInput
                    onChangeText={handleChange('hgt')}
                    value={values.hgt}
                    onBlur={() => setFieldTouched('hgt')}
                />
                <View>
                    {touched.hgt && errors.hgt && (
                        <Text>{errors.hgt}</Text>
                    )}
                </View>

                <TouchableOpacity
                disabled={!isValid}
                onPress={handleSubmit}>
                    <Text> Registrar </Text>
                </TouchableOpacity>

            </Fragment>
        )}
    </Formik>
  );
}
