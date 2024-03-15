import React from 'react';

const StandardTable = () => {
  return (
    <div>
      {' '}
      <div className="flex-col mb-12 text-center justify-start">
        <h1 className="bg-black text-black font-bold text-lg px-4 py-2 mb-4 mr-8 lg:mr-0">
          Standard Data
        </h1>
        <div className="flex flex-row items-start justify-center lg:flex-col">
          <table className="border-collapse border border-gray-800 text-sm mr-8 lg:mt-4 lg:mr-0">
            <thead className="text-black">
              <tr className="text-black">
                <th className="border text-black border-gray-800 px-4 py-2">
                  Age
                </th>
                <th className="border text-black border-gray-800 px-4 py-2">
                  Standard Weight
                </th>
                <th className="border border-gray-800 px-4 py-2">
                  Standard FCR
                </th>
              </tr>
            </thead>
            <tbody className="text-black text-sm">
              <tr>
                <td className="border border-gray-800 px-4 py-2">1</td>
                <td className="border border-gray-800 px-4 py-2">61</td>
                <td className="border border-gray-800 px-4 py-2">0.207</td>
              </tr>
              <tr>
                <td className="border border-gray-800 px-4 py-2">2</td>
                <td className="border border-gray-800 px-4 py-2">79</td>
                <td className="border border-gray-800 px-4 py-2">0.37</td>
              </tr>
              <tr>
                <td className="border border-gray-800 px-4 py-2">3</td>
                <td className="border border-gray-800 px-4 py-2">100</td>
                <td className="border border-gray-800 px-4 py-2">0.499</td>
              </tr>
              <tr>
                <td className="border border-gray-800 px-4 py-2">4</td>
                <td className="border border-gray-800 px-4 py-2">123</td>
                <td className="border border-gray-800 px-4 py-2">0.601</td>
              </tr>
              <tr>
                <td className="border border-gray-800 px-4 py-2">5</td>
                <td className="border border-gray-800 px-4 py-2">148</td>
                <td className="border border-gray-800 px-4 py-2">0.682</td>
              </tr>
              <tr>
                <td className="border border-gray-800 px-4 py-2">6</td>
                <td className="border border-gray-800 px-4 py-2">177</td>
                <td className="border border-gray-800 px-4 py-2">0.749</td>
              </tr>
              <tr>
                <td className="border border-gray-800 px-4 py-2">7</td>
                <td className="border border-gray-800 px-4 py-2">209</td>
                <td className="border border-gray-800 px-4 py-2">0.803</td>
              </tr>
              <tr>
                <td className="border border-gray-800 px-4 py-2">8</td>
                <td className="border border-gray-800 px-4 py-2">244</td>
                <td className="border border-gray-800 px-4 py-2">0.848</td>
              </tr>{' '}
              <tr>
                <td className="border border-gray-800 px-4 py-2">9</td>
                <td className="border border-gray-800 px-4 py-2">283</td>
                <td className="border border-gray-800 px-4 py-2">0.887</td>
              </tr>
              <tr>
                <td className="border border-gray-800 px-4 py-2">10</td>
                <td className="border border-gray-800 px-4 py-2">325</td>
                <td className="border border-gray-800 px-4 py-2">0.92</td>
              </tr>
            </tbody>
          </table>
          <table className="border-collapse border border-gray-800 text-sm mr-8 lg:mt-4 lg:mr-0">
            <thead className="text-black">
              <tr className="text-black">
                <th className="border text-black border-gray-800 px-4 py-2">
                  Age
                </th>
                <th className="border text-black border-gray-800 px-4 py-2">
                  Standard Weight
                </th>
                <th className="border border-gray-800 px-4 py-2">
                  Standard FCR
                </th>
              </tr>
            </thead>
            <tbody className="text-black text-sm">
              <tr>
                <td className="border border-gray-800 px-4 py-2">11</td>
                <td className="border border-gray-800 px-4 py-2">370</td>
                <td className="border border-gray-800 px-4 py-2">0.949</td>
              </tr>
              <tr>
                <td className="border border-gray-800 px-4 py-2">12</td>
                <td className="border border-gray-800 px-4 py-2">419</td>
                <td className="border border-gray-800 px-4 py-2">0.975</td>
              </tr>
              <tr>
                <td className="border border-gray-800 px-4 py-2">13</td>
                <td className="border border-gray-800 px-4 py-2">471</td>
                <td className="border border-gray-800 px-4 py-2">0.999</td>
              </tr>
              <tr>
                <td className="border border-gray-800 px-4 py-2">14</td>
                <td className="border border-gray-800 px-4 py-2">527</td>
                <td className="border border-gray-800 px-4 py-2">1.021</td>
              </tr>
              <tr>
                <td className="border border-gray-800 px-4 py-2">15</td>
                <td className="border border-gray-800 px-4 py-2">586</td>
                <td className="border border-gray-800 px-4 py-2">1.042</td>
              </tr>
              <tr>
                <td className="border border-gray-800 px-4 py-2">16</td>
                <td className="border border-gray-800 px-4 py-2">648</td>
                <td className="border border-gray-800 px-4 py-2">1.062</td>
              </tr>
              <tr>
                <td className="border border-gray-800 px-4 py-2">17</td>
                <td className="border border-gray-800 px-4 py-2">714</td>
                <td className="border border-gray-800 px-4 py-2">1.082</td>
              </tr>
              <tr>
                <td className="border border-gray-800 px-4 py-2">18</td>
                <td className="border border-gray-800 px-4 py-2">782</td>
                <td className="border border-gray-800 px-4 py-2">1.101</td>
              </tr>
              <tr>
                <td className="border border-gray-800 px-4 py-2">19</td>
                <td className="border border-gray-800 px-4 py-2">854</td>
                <td className="border border-gray-800 px-4 py-2">1.12</td>
              </tr>
              <tr>
                <td className="border border-gray-800 px-4 py-2">20</td>
                <td className="border border-gray-800 px-4 py-2">928</td>
                <td className="border border-gray-800 px-4 py-2">1.138</td>
              </tr>
            </tbody>
          </table>

          <table className="border-collapse border border-gray-800 text-sm mr-8 lg:mt-4 lg:mr-0">
            <thead className="text-black">
              <tr className="text-black">
                <th className="border text-black border-gray-800 px-4 py-2">
                  Age
                </th>
                <th className="border text-black border-gray-800 px-4 py-2">
                  Standard Weight
                </th>
                <th className="border border-gray-800 px-4 py-2">
                  Standard FCR
                </th>
              </tr>
            </thead>
            <tbody className="text-black text-sm">
              <tr>
                <td className="border border-gray-800 px-4 py-2">21</td>
                <td className="border border-gray-800 px-4 py-2">1006</td>
                <td className="border border-gray-800 px-4 py-2">1.157</td>
              </tr>
              <tr>
                <td className="border border-gray-800 px-4 py-2">22</td>
                <td className="border border-gray-800 px-4 py-2">1085</td>
                <td className="border border-gray-800 px-4 py-2">1.175</td>
              </tr>
              <tr>
                <td className="border border-gray-800 px-4 py-2">23</td>
                <td className="border border-gray-800 px-4 py-2">1168</td>
                <td className="border border-gray-800 px-4 py-2">1.193</td>
              </tr>
              <tr>
                <td className="border border-gray-800 px-4 py-2">24</td>
                <td className="border border-gray-800 px-4 py-2">1252</td>
                <td className="border border-gray-800 px-4 py-2">1.212</td>
              </tr>
              <tr>
                <td className="border border-gray-800 px-4 py-2">25</td>
                <td className="border border-gray-800 px-4 py-2">1339</td>
                <td className="border border-gray-800 px-4 py-2">1.23</td>
              </tr>
              <tr>
                <td className="border border-gray-800 px-4 py-2">26</td>
                <td className="border border-gray-800 px-4 py-2">1428</td>
                <td className="border border-gray-800 px-4 py-2">1.248</td>
              </tr>
              <tr>
                <td className="border border-gray-800 px-4 py-2">27</td>
                <td className="border border-gray-800 px-4 py-2">1518</td>
                <td className="border border-gray-800 px-4 py-2">1.267</td>
              </tr>
              <tr>
                <td className="border border-gray-800 px-4 py-2">28</td>
                <td className="border border-gray-800 px-4 py-2">1661</td>
                <td className="border border-gray-800 px-4 py-2">1.285</td>
              </tr>
              <tr>
                <td className="border border-gray-800 px-4 py-2">29</td>
                <td className="border border-gray-800 px-4 py-2">1704</td>
                <td className="border border-gray-800 px-4 py-2">1.304</td>
              </tr>
              <tr>
                <td className="border border-gray-800 px-4 py-2">30</td>
                <td className="border border-gray-800 px-4 py-2">1799</td>
                <td className="border border-gray-800 px-4 py-2">1.32</td>
              </tr>
              <tr>
                <td className="border border-gray-800 px-4 py-2">31</td>
                <td className="border border-gray-800 px-4 py-2">1895</td>
                <td className="border border-gray-800 px-4 py-2">1.341</td>
              </tr>
              <tr>
                <td className="border border-gray-800 px-4 py-2">32</td>
                <td className="border border-gray-800 px-4 py-2">1992</td>
                <td className="border border-gray-800 px-4 py-2">1.36</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StandardTable;
