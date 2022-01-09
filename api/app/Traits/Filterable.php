<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;

trait Filterable
{
    /**
     * @param array $filter
     * @return Builder
     */
    public function scopeQuery(array $filter = []): Builder
    {
        $query = $this->model->query();
        if (!empty($filter)) {
            foreach (array_keys(array_filter($filter)) as $field) {
                $value = $filter[$field];

                if (is_string($value)) {
                    $query = $query->where($field, 'like', $value);
                }
                if (is_integer($value)) {
                    $query = $query->where($field, $value);
                }
                if (is_array($value)) {
                    if (self::hasInterval($value)) {
                        $query = $this->setIntervalFilter(
                            $query,
                            $filter[$field],
                            $field
                        );
                    } else {
                        $query = $query->whereIn($field, $value);
                    }
                }
            }
        }
        return $query;
    }

    /**
     * @param array $array
     * @return bool
     */
    private static function hasInterval(array $array): bool
    {
        $keys = array_keys($array);
        return in_array('from', $keys, true) || in_array('to', $keys, true);
    }

    /**
     * @param Builder $query
     * @param array $filter
     * @param string $field
     * @return Builder
     */
    private function setIntervalFilter(
        Builder $query,
        array $filter,
        string $field
    ): Builder {
        if (!empty($filter['from'])) {
            $query->whereDate(
                $field,
                '>=',
                date("Y-m-d", strtotime($filter['from']))
            );
        }
        if (!empty($filter['to'])) {
            $query->whereDate(
                $field,
                '<=',
                date("Y-m-d", strtotime($filter['to']))
            );
        }
        return $query;
    }
}
