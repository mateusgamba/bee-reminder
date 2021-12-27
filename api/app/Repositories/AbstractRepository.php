<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

abstract class AbstractRepository
{
    /**
     * @param int $id
     * @return Model
     */
    public function find(int $id): Model
    {
        return $this->model->find($id);
    }

    /**
     * @param int $id
     * @return Model
     */
    public function findFirstWhere(array $data): Model
    {
        return $this->model->firstWhere($data);
    }

    /**
     * @param array|null $filter
     * @return Builder
     */
    public function all(?array $filter): Builder
    {
        return $this->scopeQuery($filter);
    }

    /**
     * @param array $data
     * @return Model
     */
    public function create(array $data)
    {
        return $this->model->create($data);
    }

    /**
     * @param array $data
     * @return Model
     */
    public function firstOrCreate(array $data)
    {
        return $this->model->firstOrCreate($data);
    }

    /**
     * @param array $data
     * @param int $id
     * @return Modal
     */
    public function update(array $data, int $id): Modal
    {
        $modal = $this->model->find($id);
        $modal->update($data);
        return $modal;
    }

    /**
     * @param int $id
     * @return bool
     */
    public function destroy(array $id): bool
    {
        $this->model->destroy($id);
        return true;
    }
}
