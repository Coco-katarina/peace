import React, { useRef } from "react";
import { connect } from "react-redux";
import { Modal, Divider } from "antd";
import { Form } from '@peace/components'
import { publishProject } from "../actions/projectInfo";

const ReleaseModal = (props) => {
	const { dispatch, closeModal, modalData } = props;
	const _formRef = useRef(null)

	let data2Edit =
		modalData ? {
			name: modalData.name,
			describe: modalData.describe,

			orgrole: 'BuiltBureau'
		} : {}

	const renderForm2Items = () => {
		let items = [{
			type: "Input",
			id: "username",
			label: "用户名",
			rules: [{
				pattern: /^[a-z0-9A-Z_]{5,20}$/,
				message: "账号由5-20位字母、数字或_组成"
			}, {
				required: true, max: 50, message: "请输入合法的用户名"
			}],
			itemProps: {
				placeholder: "请输入管理员用户名",
			},
		}, {
			type: "Input",
			id: "password",
			label: "密码",
			rules: [{
				pattern: /^[a-z0-9A-Z_]{6,20}$/,
				message: "密码由6-20位字母、数字或_组成"
			}, {
				required: true, max: 50, message: "请输入合法的密码"
			}],
			itemProps: {
				placeholder: "请输入密码",
				type: "password"
			},
		}, {
			type: "Input",
			id: "passwordConfirm",
			label: "确认密码",
			rules: [{
				required: true, max: 50, message: "请确认密码"
			}, {
				validator: async (rule, value) => {
					const { current } = _formRef
					if (current.getFieldValue('password') != value) {
						throw new Error('两次输入的密码不一致!');
					}
				}
			}],
			itemProps: {
				placeholder: "请再次确认密码",
				type: "password"
			},
		}];
		if (modalData.structureClassify == 'construction') {
			items.push({
				type: "Input",
				id: "orgrole",
				label: "",
				rules: [{ required: true, }],
				itemProps: {
					type: 'hidden',
				},
			})
		}
		return items
	}

	const submit = () => {
		const { current } = _formRef
		current.validateFields().then(val => {
			dispatch(publishProject(modalData.key, {
				username: val.username,
				password: val.password,
				orgrole: val.orgrole ? val.orgrole : null,
				name: modalData.name
			})).then(res => {
				if (res.success) {
					closeModal(true)
				}
			})
		})
	};

	return (
		<Modal title="发布项目" maskClosable={false} visible={true} onCancel={closeModal} onOk={submit}>
			<Form
				ref={_formRef}
				formItems={[{
					type: "Input",
					id: "name",
					label: "项目名称",
					rules: [{ required: true, whitespace: true, }],
					itemProps: {
						maxLength: 50,
						disabled: true
					},
				}, {
					type: "Text",
					id: "describe",
					label: "项目描述",
					rules: [{ required: true }],
					itemProps: {
						autosize: { minRows: 3, maxRows: 6 },
						disabled: true
					},
				},]}
				formItemLayout={{ labelCol: { span: 5 }, wrapperCol: { span: 19 } }}
				popupContainerId="releaseProjectForm"
				dataToEdit={data2Edit}
			/>
			<Divider>设置管理员</Divider>
			<Form
				ref={_formRef}
				formItems={renderForm2Items()}
				formItemLayout={{ labelCol: { span: 5 }, wrapperCol: { span: 19 } }}
				popupContainerId="releaseProjectForm2"
				dataToEdit={data2Edit}
			/>
		</Modal>
	)
}

function mapStateToProps(state) {
	const { auth } = state;
	return {

	};
}

export default connect(mapStateToProps)(ReleaseModal);
