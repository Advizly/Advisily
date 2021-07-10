#include <iostream>
#include <fstream>
#include <sstream>
#include <string>

int main()
{

    std::string file_name = "CSCECourses.csv";

    std::ifstream ins(file_name);
    std::ofstream outs("CSCCoursesParsed.txt");

    if (ins.fail())
        return 0;

    while (!ins.eof())
    {
        std::string line;

        std::getline(ins, line);
        if (line.empty())
            continue;

        std::stringstream ss(line);

        std::string code, short_number, long_number, title;

        std::getline(ss, code, ',');
        std::getline(ss, short_number, '/');
        std::getline(ss, long_number, ',');
        std::getline(ss, title, ',');

        outs << "{\"courseCode\": \"" << code
             << "\",\n \"courseShortNumber\":\"" << short_number
             << "\",\n \"courseLongNumber\":\"" << long_number
             << "\",\n \"courseTitle\":\"" << title << "\"},\n";
    }

    return 0;
}