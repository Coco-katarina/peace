import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Modal, message, } from 'antd';

const AvatorModal = props => {
    const { visible, onClose, editData, dispatch, actions, user } = props
    const [curAvator, setCurAvator] = useState(editData.avatorId)
    const [loading, setLoading] = useState(false)
    const { profile } = actions

    return (
        <Modal
            visible={true}
            title={'请选择头像'}
            onCancel={() => { onClose() }}
            onOk={() => {
                if (!curAvator) {
                    return message.error('请选择头像')
                }
                setLoading(true)
                dispatch(profile.editProfile(user.id, { avator: curAvator + '.png' }, 'avator')).then(res => {
                    if (res.success) {
                        onClose(true)
                    }
                    setLoading(false)
                })
            }}
            loading={loading}
        >
            {(() => {
                let col = []
                for (let i = 1; i <= 12; i++) {
                    col.push(
                        <img
                            onClick={() => setCurAvator(i.toString())}
                            key={i}
                            style={{ width: '25%', borderBottom: i == curAvator ? '1px solid green' : '' }}
                            src={`/assets/avatar/${i}.png`}
                        />
                    )
                    if (i % 4 == 0) {
                        col.push(<br />)
                    }
                }
                return col
            })()}
        </Modal>
    )
}

function mapStateToProps(state) {
    const { auth, global } = state;
    return {
        requesting: false,
        actions: global.actions,
        user: auth.user
    };
}

export default connect(mapStateToProps)(AvatorModal);