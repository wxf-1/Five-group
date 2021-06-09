import React, { useEffect, useState } from "react"
import {Tree,Input,Button,Rate } from 'antd'
import useStore from "@/context/useStore"
import { FormOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { observer } from "mobx-react-lite";
import Editor from 'for-editor'
import Style from './skillDescription.less'

const { Search } = Input;
interface IProps {
    stationVersionId: string
}
const rates = ['', '了解', '熟悉', '掌握'];
const SKillDescription: React.FC<IProps> = props => {
    const { station } = useStore();
    const [currentSkillId, setCurrentSkillId] = useState('');
    const [isEdit, setIsEdit] = useState(false);


    useEffect(() => {
        station.selectSkillList(props.stationVersionId);
    }, [])

    useEffect(() => {
        if (currentSkillId) {
            station.getStationSkillDetail(currentSkillId);
        }
    }, [currentSkillId]);
    // 在树的尾部追加一项
    function addDescription() {
        station.inintSkill(props.stationVersionId);
    }
    // 在当前树增加一个子树
    function addChildDescription(parentId: string) {
        console.log(parentId);
        
        station.inintSkill(props.stationVersionId,parentId);
    }
    // 从父树中删掉当前树
    function removeChildDescription(skillId: string) {
        station.deleteSkill(skillId);
    }
    return <div className={Style.tree}>
        {/* 成功之后给个提示 */}
        <Button type="primary" onClick={()=>station.putSkill()}>保存</Button>
        {/* 左边树形结构 */}
        <section className={Style.Treeleft}>
            <section>
                <Search style={{ marginBottom: 8 }} placeholder="清输入内容" />
                <Button onClick={() => addDescription()}>+</Button>
            </section>
            <Tree
                autoExpandParent={true}
                treeData={station.skillList}
                titleRender={(nodeData: any) => {
                    return <p onClick={() => setCurrentSkillId(nodeData.id)}>
                        {isEdit && currentSkillId===nodeData.id  ? <input type="text" value={station.skillDetail.skillName} onKeyDown={e => {
                            // 弹个框
                            if (e.keyCode === 13) {
                                station.putSkill();
                                setIsEdit(false);
                            }
                        }} onChange={e => station.modifySKillDetail({skillName: e.target.value})} />
                            : <span>{currentSkillId===nodeData.id ?station.skillDetail.skillName: nodeData.label}</span>}
                        {currentSkillId === nodeData.id ? <span>
                            <FormOutlined onClick={() => setIsEdit(true)} />
                            <PlusOutlined onClick={() => addChildDescription(nodeData.id)} />
                            <MinusOutlined onClick={() => removeChildDescription(nodeData.id)} />
                        </span> : null}
                    </p>
                }}
            />
        </section>
        {currentSkillId?<section className={Style.mdwen}>
            <Rate count={3} value={station.skillDetail.masterRequired} defaultValue={1} onChange={value=>station.modifySKillDetail({masterRequired: value})}/>
           <span className="ant-rate-text">{rates[station.skillDetail.masterRequired]}</span>
            <span>一星到三星分别代表了解、掌握、精通3个级别</span>
            <Editor value={station.skillDetail.abilityStandard || ''} onChange={value =>station.modifySKillDetail({abilityStandard: value})}/> 
        </section>: null}
    </div>
}

export default observer(SKillDescription);
