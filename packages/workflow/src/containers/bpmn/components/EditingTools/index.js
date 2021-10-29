import React, { Component } from 'react';
import { 
  FolderOpenOutlined,
  UndoOutlined,
  RedoOutlined,
  SearchOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  SaveOutlined,
  DownloadOutlined,
  FileImageOutlined
} from '@ant-design/icons';
import './index.less';

class EditingTools extends Component {
  constructor(props) {
    super(props);
   
    this.fileRef = React.createRef();
   
}
  handleOpen = () => {
    this.fileRef.current.click();
  };

  render() {
    const {
      onOpenFIle,
      onZoomIn,
      onZoomOut,
      onZoomReset,
      onUndo,
      onRedo,
      onSave,
      onDownloadXml,
      onDownloadSvg
    } = this.props;
    return (
      <div className='editingTools'>
        <ul className='controlList'>
          <li className='control line'>
            <input
              ref={this.fileRef}
              className='openFile'
              type="file"
              onChange={onOpenFIle}
            />
            <button type="button" title="打开" onClick={this.handleOpen}>
            <FolderOpenOutlined />
            </button>
          </li>

          <li className='control'>
            <button type="button" title="撤销" onClick={onUndo}>
              <UndoOutlined />
            </button>
          </li>
          <li className='control line'>
            <button type="button" title="恢复" onClick={onRedo}>
              <RedoOutlined />
            </button>
          </li>

          <li className='control'>
            <button type="button" title="重置放大/缩小" onClick={onZoomReset}>
              <SearchOutlined />
            </button>
          </li>
          <li className='control'>
            <button type="button" title="放大" onClick={onZoomIn}>
              <ZoomInOutlined />
            </button>
          </li>
          <li className='control line'>
            <button type="button" title="缩小" onClick={onZoomOut}>
              <ZoomOutOutlined />
            </button>
          </li>

          <li className='control'>
            <button type="button" title="保存" onClick={onSave}>
              <SaveOutlined />
            </button>
          </li>
          <li className='control'>
            <button type="button" title="下载设计图" onClick={onDownloadXml}>
              <DownloadOutlined />
            </button>
          </li>
          <li className='control'>
            <button type="button" title="下载为svg图片" onClick={onDownloadSvg}>
              <FileImageOutlined />
            </button>
          </li>
          {/* <li className='control'>
            <button type="button" title="选择通用流程模板" onClick={onDownloadSvg}>
              <FileImageOutlined />
            </button>
          </li> */}
        </ul>
      </div>
    );
  }
}

export default EditingTools;
