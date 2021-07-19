#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <vector>
#include <iomanip>
#include <ctype.h>
typedef std::vector<std::string> cols_vector;

void emit_error(const char *msg)
{
    if (msg)
        std::cout << msg;
    exit(1);
}
void get_cols(std::ifstream &ins, cols_vector &col_names)
{
    if (!ins.is_open())
        return;

    int count = 0;

    std::string line;
    std::getline(ins, line);
    if (line.empty())
        return;

    std::stringstream ss(line);
    std::string col_name;
    while (std::getline(ss, col_name, ','))
        col_names.push_back(col_name);
}

void output_column_names(std::ofstream &outs, const cols_vector &columns, std::string &table_name)
{
    if (table_name.empty())
        table_name = "<TABLE NAME>";
    outs << "INSERT INTO " << table_name << " (";
    for (uint32_t i = 0; i < columns.size(); i++)
        if (i == columns.size() - 1)
            outs << columns[i] << ")\n";
        else
            outs << columns[i] << ",";

    outs << std::setw(25) << "VALUES";
}

bool isNumber(const std::string &str)
{
    if (str.empty())
        return false;
    if (!isdigit(str[0]) && str[0] != '-')
        return false;

    for (int i = 1; i < str.size(); i++)
        if (!isdigit(str[i]))
            return false;

    return true;
}

void output_col_values(std::ofstream &outs, std::stringstream &ss, int col_count)
{
    std::string col_value;
    for (int i = 0; i < col_count; i++)
    {
        std::getline(ss, col_value, ',');
        if (!isNumber(col_value))
            col_value = "\"" + col_value + "\"";
        if (i == col_count - 1)
            outs << col_value;
        else
            outs << col_value << ",";
    }
}

std::string get_output_file_name(const std::string &in_file_name)
{
    size_t lastindex = in_file_name.find_last_of(".");
    return in_file_name.substr(0, lastindex) + ".sql";
}

int main(int argc, char *argv[])
{
    if (argc < 2)
        emit_error("use: csv_to_sql.cpp <file_path> [table_name]");
    std::string table_name;
    if (argc >= 3)
        table_name = argv[2];

    std::string in_file = argv[1];
    std::string out_file = get_output_file_name(in_file);

    std::ifstream ins(in_file);
    std::ofstream outs(out_file);

    if (ins.fail())
        emit_error("failed to open file");

    cols_vector columns;
    get_cols(ins, columns);
    if (columns.empty())
        emit_error("Couldn't get column names\n");

    output_column_names(outs, columns, table_name);

    std::cout << "\nColumn names found: ";
    for (auto col : columns)
        std::cout << col << ", ";
    std::cout << "\nSaving output to: " << out_file << "\n";

    bool first_time = true;
    while (!ins.eof())
    {
        std::string line;

        std::getline(ins, line);
        if (line.empty())
            continue;

        std::stringstream ss(line);

        if (first_time)
        {
            outs << "(";
            first_time = false;
        }
        else
            outs << std::setw(25) << "(";

        output_col_values(outs, ss, columns.size());

        if (!ins.eof())
            outs << "),\n";
        else
            outs << ");\n";
    }

    return 0;
}