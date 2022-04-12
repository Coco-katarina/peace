import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { LayoutContent } from '@peace/components';
import AvatorModal from '../components/avatorModal';
import UserFieldModal from '../components/fieldModal'
import { Descriptions, Divider, Switch } from 'antd'
import {
    getProfile, modifyEmailEnable, modifyEmailDisable, modifySmsEnable, modifySmsDisable, midifyDndEnable, modifyDndDisable
} from '../actions/profile'

const profileContainer = props => {
    const { dispatch, user, profile } = props
    const [curModal, setCurModal] = useState('')

    useEffect(() => {
        dispatch(getProfile(user?.id))
    }, [])

    const closeModal = (refresh) => {
        setCurModal('')
        if (refresh) {
            dispatch(getProfile(user?.id))
        }
    }
    const refreshUser = () => {
        dispatch(getProfile(user?.id))
    }
    const onSwitchChange = (value, type) => {
        if (type === 'email') {
            dispatch(value ? modifyEmailEnable(user?.id) : modifyEmailDisable(user?.id)).then(res => {
                refreshUser()
            })
        }
        if (type === 'sms') {
            dispatch(value ? modifySmsEnable(user?.id) : modifySmsDisable(user?.id)).then(res => {
                refreshUser()
            })
        }
        if (type === 'dnd') {
            dispatch(value ? midifyDndEnable(user?.id) : modifyDndDisable(user?.id)).then(res => {
                refreshUser()
            })
        }
    }

    return (
        <LayoutContent>
            <div style={{ width: '100%' }}>
                <img style={{ width: '130px', height: '130px', borderRadius: '10px' }} src={"../../assets/avatar/" + profile.avator} />
            </div>
            <a onClick={() => {
                setCurModal(<AvatorModal editData={{ avatorId: profile.avator.split('.')[0] }} onClose={closeModal} />)
            }} style={{ marginLeft: '40px' }}>修改头像</a>
            <div style={{ width: '70%', marginTop: 24 }}>
                <Descriptions column={2}>
                    <Descriptions.Item label="用户名">
                        <div style={{ width: '96%' }}>
                            {profile.username}<a style={{ float: 'right' }} onClick={() => {
                                setCurModal(
                                    <UserFieldModal
                                        kind='pswd'
                                        onClose={closeModal}
                                    />
                                )
                            }}>修改密码</a>
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="姓名">
                        <div style={{ width: '96%' }}>
                            {profile.name}<a style={{ float: 'right' }} onClick={() => {
                                setCurModal(
                                    <UserFieldModal
                                        kind='name'
                                        onClose={closeModal}
                                        editData={{ name: profile.name }}
                                    />
                                )
                            }}>修改</a>
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="部门">{profile.department}</Descriptions.Item>
                    <Descriptions.Item label="职务">{profile.post}</Descriptions.Item>
                    <Descriptions.Item label="邮箱" span={2}>
                        <div style={{ width: '98%' }}>
                            {profile.email}<a style={{ float: 'right' }} onClick={() => {
                                setCurModal(
                                    <UserFieldModal
                                        kind='email'
                                        onClose={closeModal}
                                        editData={{ email: profile.email }}
                                    />
                                )
                            }}>修改</a>
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="电话" span={2}>
                        <div style={{ width: '98%' }}>
                            {profile.phone}<a style={{ float: 'right' }} onClick={() => {
                                setCurModal(
                                    <UserFieldModal
                                        kind='phone'
                                        onClose={closeModal}
                                        editData={{ phone: profile.phone }}
                                    />
                                )
                            }}>修改</a>
                        </div>
                    </Descriptions.Item>
                </Descriptions>
            </div>
            {curModal}
            <div>
                <Divider />
                <div style={{ fontSize: '18px', fontWeight: '600' }}>通知设置</div>
                <div style={{ paddingLeft: '5px' }}>
                    <div style={{ marginTop: '30px' }}>
                        <div>开启邮件通知：<Switch onChange={(e) => onSwitchChange(e, 'email')} checked={profile?.emailNotificationEnabled} /></div>
                        <div style={{ marginTop: '4px' }}>开启后我们将通过邮件向您发送通知消息</div>
                    </div>
                    <div style={{ marginTop: '30px' }}>
                        <div>开启短信通知：<Switch onChange={(e) => onSwitchChange(e, 'sms')} checked={profile?.smsNotificationEnabled} /></div>
                        <div style={{ marginTop: '4px' }}>开启后我们将通过短信向您发送通知消息</div>
                    </div>
                    <div style={{ marginTop: '30px' }}>
                        <div>开启免打扰：<Switch onChange={(e) => onSwitchChange(e, 'dnd')} checked={profile?.dndEnabled} /></div>
                        <div style={{ marginTop: '4px' }}>开启后我们将在每日22:00至次日8:00不再向您发送通知消息</div>
                    </div>
                </div>
            </div>
        </LayoutContent >
    )
}

function mapStateToProps(state) {
    const { auth, global, profile } = state;
    return {
        loading: profile.isRequesting,
        user: auth.user,
        profile: profile.data || {},
        // actions: global.actions,
        // members: members.data
    };
}

export default connect(mapStateToProps)(profileContainer);

