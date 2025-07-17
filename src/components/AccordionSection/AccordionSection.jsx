import { ChevronDown, ChevronRight } from "lucide-react";
import NewGrid from "../NewGrid/NewGrid";

const AccordionSection = ({
  sectionData,
  expandedSections,
  companies,
  setSectionData,
  selectedNavItem,
  toggleSectionWithKey,
}) => {
  return (
    <div className="space-y-4">
      {Object.keys(sectionData).map((sectionKey, index) => (
        <div
          key={sectionKey}
          className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden"
          style={{
            animationDelay: `${index * 100}ms`,
          }}
        >
          {/* Accordion Header */}
          <button
            onClick={() => toggleSectionWithKey(sectionKey)}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-750 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {sectionData[sectionKey].sectionName}
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  {sectionData[sectionKey].questions?.length || 0} questions
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="px-3 py-1 bg-gray-700 text-gray-300 text-sm font-medium rounded-full">
                {sectionData[sectionKey].questions?.length || 0} items
              </div>
              {expandedSections[sectionKey] ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </button>

          {/* Accordion Content */}
          {expandedSections[sectionKey] && (
            <div className="border-t border-gray-700 p-6">
              {/* <AgGrid rowData={sectionData[sectionKey].questions} /> */}
              {/* <Grid rowData={sectionData[sectionKey].questions} /> */}
              <NewGrid
                rowData={sectionData[sectionKey].questions}
                companies={companies}
                setSectionData={setSectionData}
                sectionData={sectionData}
                sectionKey={sectionKey}
                selectedNavItem={selectedNavItem}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AccordionSection;
