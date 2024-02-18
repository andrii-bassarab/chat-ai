// import { Plate } from '@udecode/plate-common';
// import { Editor } from '@/components/plate-ui/editor';

// const initialValue = [
//   {
//     type: 'p',
//     children: [
//       {
//         text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor, exercitationem illo numquam soluta, praesentium, laudantium et quia earum consequuntur odio officia sint. Alias eveniet dicta neque veritatis mollitia aut molestiae!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor, exercitationem illo numquam soluta, praesentium, laudantium et quia earum consequuntur odio officia sint. Alias eveniet dicta neque veritatis mollitia aut molestiae!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor, exercitationem illo numquam soluta, praesentium, laudantium et quia earum consequuntur odio officia sint. Alias eveniet dicta neque veritatis mollitia aut molestiae!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor, exercitationem illo numquam soluta, praesentium, laudantium et quia earum consequuntur odio officia sint. Alias eveniet dicta neque veritatis mollitia aut molestiae!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor, exercitationem illo numquam soluta, praesentium, laudantium et quia earum consequuntur odio officia sint. Alias eveniet dicta neque veritatis mollitia aut molestiae!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor, exercitationem illo numquam soluta, praesentium, laudantium et quia earum consequuntur odio officia sint. Alias eveniet dicta neque veritatis mollitia aut molestiae!',
//       },
//     ],
//   },
// ];

// export function BasicEditorValueDemo() {
//   return (
//     <Plate initialValue={initialValue}>
//       <Editor style={{ borderColor: 'transparent' }} />
//     </Plate>
//   );
// }
// import { createPlateUI } from '@/plate/create-plate-ui';
import { createBasicElementsPlugin } from '@udecode/plate-basic-elements';
import { createBasicMarksPlugin } from '@udecode/plate-basic-marks';
import { createPlugins, Plate } from '@udecode/plate-common';

// import { Editor } from '@/components/plate-ui/editor';

export function BasicEditorValueDemo() {
  const plugins = createPlugins([createBasicElementsPlugin(), createBasicMarksPlugin()], {
    // components: createPlateUI(),
  });

  return (
    <div className='mt-[72px] p-10'>
      <Plate plugins={plugins}>
        <div style={{ width: '100%', height: '100%', background: 'yellow' }}></div>
        {/* <Editor placeholder='Type your message here.' /> */}
      </Plate>
    </div>
  );
}
