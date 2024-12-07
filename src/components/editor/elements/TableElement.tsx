import React from 'react';
import { TemplateElement, TableData } from '../../../types';
import { BaseElement } from './BaseElement';
import { useTemplateStore } from '../../../store/templateStore';

interface TableElementProps {
  element: TemplateElement;
}

export const TableElement: React.FC<TableElementProps> = ({ element }) => {
  const { updateElement } = useTemplateStore();
  const tableData: TableData = JSON.parse(element.content);

  const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
    const newData = { ...tableData };
    newData.data[rowIndex][colIndex] = value;
    updateElement(element.id, { content: JSON.stringify(newData) });
  };

  return (
    <BaseElement element={element}>
      <div className="w-full h-full overflow-auto">
        <table className="w-full border-collapse">
          <tbody>
            {tableData.data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td
                    key={colIndex}
                    className="border border-gray-300 p-1"
                    style={{
                      backgroundColor: element.style.backgroundColor,
                      color: element.style.color,
                      fontFamily: element.style.fontFamily,
                      fontSize: element.style.fontSize,
                    }}
                  >
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                      className="w-full bg-transparent border-none focus:outline-none"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </BaseElement>
  );
};
