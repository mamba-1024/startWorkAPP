
import { Collapse, CollapseItem } from '@nutui/nutui-react-taro';

export default () => {
  return (
    <Collapse activeName={['1', '2']} icon="arrow-down" iconSize="14" iconColor="#999">
      <CollapseItem title="请问怎么获得星星？" name="1">
      上班累积9.5h可以积一分，积攒110分可以得到一颗星
      </CollapseItem>
      <CollapseItem title="请问星星有什么用处？" name="2">
      累积越多后获得年终奖几率越高
      </CollapseItem>
      <CollapseItem title="打卡提示“你的打卡功能已关闭，请联系管理员启用”，是什么原因？" name="3">
      由于后台规定连续7天未打卡会关闭打卡功能，这时候只需要联系管理员重新启用就可以。
      </CollapseItem>
      <CollapseItem title="每年积分会清零么？" name="4">
      是的，每年会统一清零一次。
      </CollapseItem>
    </Collapse>
  );
};
